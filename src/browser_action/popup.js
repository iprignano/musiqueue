'use strict';

// Get Background page reference
var BGPage = chrome.extension.getBackgroundPage();

// Functions
function showBandList() {
  $('#main').fadeOut(200);
  setTimeout(function() {
    $('#list').fadeIn();
    imageRatioCheck();
  }, 220);
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
  
  if ($('#bands-list').html == '') {
    $('#list .empty').show();
  }
}

function populateBandList() {
  var bands = BGPage.bands;

  if (bands.length > 0) {
    $('#list .empty').hide();
    $.each(bands, function(key, band) {
      $('#bands-list').append(
        '<article class="band" data-band="' + band.name + '"> \
          <section class="band-left"> \
            <a href="#" class="delete-band">Delete</a> \
            <figure class="band-img"> \
              <a class="gotoband" href="' + band.url + '"> \
                <img src="' + band.photo + '" /> \
              </a> \
            </figure> \
          </section> \
          <section class="band-right"> \
            <h2 class="band-name"><a class="gotoband" href="' + band.url + '">' + band.name + '</a></h2> \
            <h4 class="band-tags"><span>' + band.tags.join('</span> <span>') + '</span></h4> \
          </section> \
          <div class="clearfix"></div> \
        </article>');
    });
  } else {
    $('#list .empty').show();
  }
}

function goToBandPage(bandUrl) {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.update(tab.id, { url: bandUrl });
  });
}

function imageRatioCheck() {
  $('.band-img').each(function() {
    var imgH = $(this).find('img').height();
    var imgW = $(this).find('img').width();

    if (imgW < imgH) {
      $(this).addClass('portrait');
    } else {
      $(this).addClass('landscape');
    }
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