'use strict';

// Get Background page reference
var BGPage = chrome.extension.getBackgroundPage();

// Bind clicks to background functions
$('#save').on('click', function() {
  BGPage.createBand();
});

$('#browse').on('click', function() {
  $('#main').fadeOut(200);

  BGPage.getBands(function() {
    var bands = BGPage.bands;
    
    if (bands.length > 0) {
      $.each(bands, function(key, band) {
        $('#bands-list').append(
          '<div class="band" data-band="' + band.name + '"> \
            <div class="band-left"> \
              <a href="#" id="delete">Delete</a> \
              <div class="band-img"><img src="' + band.photo + '" /></div> \
            </div> \
            <div class="band-right"> \
              <h2>' + band.name + '</h2> \
              <h3>' + band.url + '</h3> \
              <h4>' + band.tags.join(' ') + '</h4> \
            </div> \
            <div class="clearfix"></div> \
          </div>');
      });
    } else {
      $('#list').append('Yarr, nothing here!');
    }

    setTimeout(function() { $('#list').fadeIn(); }, 220);
  });
});

$('#close-overlay').on('click', function() {
  $(this).parent().siblings('.message').fadeOut();
  $(this).parents('.overlay').fadeOut();
});

$('#back').on('click', function() {
  $('#list').fadeOut(200);

  setTimeout(function() { 
    $('#main').fadeIn();
    $('#bands-list').html(''); 
  }, 220);
});

$(document).on('click', '#delete', function(event) {
  event.preventDefault();
  var bandToRemove = $(this).parents('.band').attr('data-band');

  BGPage.removeBand(bandToRemove);
  $(this).parents('.band').fadeOut();
});