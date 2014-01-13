'use strict';

// Get Background page reference
var BGPage = chrome.extension.getBackgroundPage();

// Functions
function showBandList() {
  $('#main').fadeOut(200);
  setTimeout(function() { $('#list').fadeIn(); }, 220);
}

function showMainMenu() {
  $('#list').fadeOut(200);

  setTimeout(function() { 
    $('#main').fadeIn();
    $('#bands-list').html(''); 
  }, 220);
}

function closeOverlay() {
  $('.overlay .message').fadeOut();
  $('.overlay').fadeOut();
}

function deleteBand(event) {
  event.preventDefault();
  var bandToRemove = $(event.currentTarget).parents('.band').attr('data-band');

  BGPage.removeBand(bandToRemove);
  $(event.currentTarget).parents('.band').fadeOut();
}

function populateBandList() {
  var bands = BGPage.bands;

  if (bands.length > 0) {
    $.each(bands, function(key, band) {
      $('#bands-list').append(
        '<div class="band" data-band="' + band.name + '"> \
          <div class="band-left"> \
            <a href="#" class="delete-band">Delete</a> \
            <div class="band-img"> \
              <a class="gotoband" href="' + band.url + '"> \
                <img src="' + band.photo + '" /> \
              </a> \
            </div> \
          </div> \
          <div class="band-right"> \
            <h2 class="band-name"><a class="gotoband" href="' + band.url + '">' + band.name + '</a></h2> \
            <h4 class="band-tags"><span>' + band.tags.join('</span> <span>') + '</span></h4> \
          </div> \
          <div class="clearfix"></div> \
        </div>');
    });
  } else {
    $('#list').append('Yarr, nothing here!');
  }
}

function goToBandPage(bandUrl) {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.update(tab.id, { url: bandUrl });
    console.log('seee');
  });
}

// Event binding
$('#save').on('click', function() {
  BGPage.createBand();
});

$('#browse').on('click', function() {
  BGPage.getBands(function() {
    populateBandList();    
    showBandList();
  });
});

$('#close-overlay').on('click', function() {
  closeOverlay();
});

$('#back').on('click', function() {
  showMainMenu();
});

$(document).on('click', '.gotoband', function(event) {
  var bandUrl = $(event.currentTarget).attr('href');
  goToBandPage(bandUrl);
});

$(document).on('click', '.delete-band', function(event) {
  deleteBand(event);
});