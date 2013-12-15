var rawName = $('header.page-head h1').text();
var artistName = $.trim(rawName);

chrome.runtime.sendMessage({ 
  method: "getDOM",
  pill: artistName
});
