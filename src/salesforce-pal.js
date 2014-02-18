$(document).ready(function(){
	/*
chrome.tabs.query({ active: true, lastFocusedWindow:true }, function(tabs){
		sfId = new SalesforceId(tabs[0]);
*/
	

	chrome.tabs.getSelected(null, function(tab){
		sfId = new SalesforceId(tab);


		$('#sf15')
			.bind('keyup', function(e){
				console.log($(this).val().length)
			
				if ($(this).val().length == 15) {
					sfId = new SalesforceId($(this).val());
					
					$('#sf18')
						.html(sfId.id18)
						.select()
					;
				}
				
			
			})
			.val(sfId.id15);
			
			
		$('#sf18')
			.html(sfId.id18)
			.select()
		;	
	}); 
	
	
	
});


function SalesforceId(tab)
{

	id = this.parseId(tab.url);
	
	if (this.isValidId(id)) {	
		this.id15 = id;
		this.id18 = this.to18(this.id15);
	}

}

SalesforceId.prototype.to18 = function(id) { 
	if (id == null || id.length == 18) {
		return id;
	}
	
	id = id.replace(/\"/g, ''); // scrub quotes from this id
	
	if (id.length != 15) {
		console.log('well, id is not 15, bye' + id + ' ' + id.length);
		return null;
	}
	
	var suffix = "";
	for (var i = 0; i < 3; i++) {
		var flags = 0;
		
		for (var j = 0; j < 5; j++) {
			var c = id.charAt(i * 5 + j);
			
			if (c >= 'A' && c <= 'Z') {
				flags += 1 << j;
			}
		}
	
		if (flags <= 25) {
			suffix += "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(flags);
		} else {
			suffix += "012345".charAt(flags-26);
		}
	}
	
	return id + suffix;
}

//http://stackoverflow.com/questions/7731778/jquery-get-query-string-parameters
SalesforceId.prototype.getParameterByName = function(name, url){
	if (typeof(url) == 'undefined') {
		url = window.location.href;
	}
 
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)", 
		regex = new RegExp( regexS ),
		results = regex.exec(url);
	if( results == null ){
		return "";
	} else{
		return decodeURIComponent(results[1].replace(/\+/g, " "));
	}
}


SalesforceId.prototype.parseId = function(url) {
	
	//it's easier to try the parameter first, and then pull straight from the page, instead of determining if the pagename is an id or no
	id = this.getParameterByName('id', url)
	
	if (id.length !== 15 || !this.isValidId(id)) {
		urlParts = url.split('/')
		id = urlParts.pop().slice(0, 15);
	}
	
	
	return id;
}

SalesforceId.prototype.isValidId = function(idToTest) {
	return new RegExp(/[a-zA-Z0-9]{15}/).test(idToTest);
}