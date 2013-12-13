var BGPage = chrome.extension.getBackgroundPage();

$('#save').on('click', function() {
  chrome.tabs.query({'active': true}, function (tabs) {
    var url = tabs[0].url;

    chrome.tabs.executeScript(null, {file: "content_script.js"});

    BGPage.createBand('The Smiths', url, 'Photos');
  });
});

$('#browse').on('click', function() {
  BGPage.listBands();
});
