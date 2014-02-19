//salesforce is really stubborn, do this 3 times
function SfFieldFormatter(fieldName)
{
	this.fieldName = fieldName;
}

SfFieldFormatter.prototype.format = function() {
	$ele = $('td.labelCol span:contains("' + this.fieldName + '")').parent().next();
	$ele.html($ele.html().replace(new RegExp(/,/g), ''));

}



s = new SfFieldFormatter('NID'); s.format();
//s = new SfFieldFormatter('Nemo ID'); s.format();
$(document).ready(function(){
	s = new SfFieldFormatter('NID'); s.format();
	//s = new SfFieldFormatter('Nemo ID'); s.format();		
	$('body').bind('change', function(e){
		//s = new SfFieldFormatter('NID'); s.format();
	
	});
});

