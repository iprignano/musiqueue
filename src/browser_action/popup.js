'use strict';

// Get Background page reference
var BGPage = chrome.extension.getBackgroundPage();

// Bind clicks to background functions
$('#save').on('click', function() {
  BGPage.createBand();

  $('.overlay.saved').fadeIn();
});

$('#browse').on('click', function() {
  $('#main').fadeOut(200);

  BGPage.getBands(function() {
    var bands = BGPage.bands;

    $.each(bands, function(key, band) {
      $('#list').append('<div class="band" data-band="' + band.name + '"><a href="#" id="delete">Delete</a> <h2>' + band.name + '</h2> <div class="band-img"><img src="' + band.photo + '" /></div> <h3>' + band.url + '</h3> <h4>' + band.tags + '</div>');
    });

    setTimeout(function() { $('#list').fadeIn(); }, 220);
  });
});

$('#close-overlay').on('click', function() {
  $(this).parents('.overlay').fadeOut();
});

$(document).on('click', '#delete', function(event) {
  event.preventDefault();
  var bandToRemove = $(this).parent().attr('data-band');

  BGPage.removeBand(bandToRemove);
  $(this).parent().remove();
});