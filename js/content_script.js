
var title = $('h1').text()

chrome.runtime.sendMessage({ 
  method: "getDOM",
  pill: title
});
