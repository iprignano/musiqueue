// Get Background page reference
var BGPage = chrome.extension.getBackgroundPage();

// Bind clicks to background functions
$('#save').on('click', function() {
  BGPage.createBand();
});

$('#browse').on('click', function() {
  BGPage.getBands(function() {
    var bands = BGPage.bands;

    bands.map(function(band) {
      $('#main-popup').append('<div class="band" data-band="' + band.name + '"><a href="#" id="delete">Delete</a><br />' + band.name + '<br />' + band.photo + '<br />' + band.url + '<br /><br /></div> ');
    });
  });
});

$(document).on('click', '#delete', function(event) {
  event.preventDefault();
  var bandToRemove = $(this).parent().attr('data-band');

  BGPage.removeBand(bandToRemove);
  $(this).parent().remove();
});