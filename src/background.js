/*
chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {	    
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page's URL contains a 'g' ...
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'salesforce.com' },
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});
*/


function checkForValidUrl(tabId, changeInfo, tab) {
	  // If the letter 'g' is found in the tab's URL...
     if (
     	tab.url.indexOf('.salesforce.com') > -1 ||
     	tab.url.indexOf('.visual.force.com') > -1
     ) {
    // ... show the page action.
	    chrome.pageAction.show(tabId);
	  }
	};
	
// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);

/*

var tabUrl;
chrome.browserAction.onClicked.addListener(function(activeTab) {
    var x=activeTab.url;
    var newURL = "https://www.google.com";
    if (x!= newURL) {
        //to open a page in a new tab
        chrome.tabs.create({url: newURL,"selected":true});
        //to open the page with the current tab
        chrome.tabs.update(activeTab.id, {url:newURL});
    }

});
*/