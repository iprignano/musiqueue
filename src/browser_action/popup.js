// Get Background page reference

var BGPage = chrome.extension.getBackgroundPage();

// Bind clicks to background functions

$('#save').on('click', function() {
  BGPage.createBand();
});

$('#browse').on('click', function() {
  BGPage.listBands();
});
