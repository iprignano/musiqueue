// Get Background page reference
var BGPage = chrome.extension.getBackgroundPage();

$('#save').on('click', function() {
  BGPage.createBand();
});

$('#browse').on('click', function() {
  BGPage.listBands();
});
