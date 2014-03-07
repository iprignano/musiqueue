'use strict';

// Initialize chrome storage, array containing bands and global vars
var storage = chrome.storage.local;
var musiqueueBands;
var artistName,
    artistPhoto,
    artistURL,
    artistTags,
    bands;

// Restoring bands saved previously
restoreSavedBands();

// Band Object Constructor
function Band(name, url, photo, tags) {
  this.name  = name;
  this.url   = url;
  this.photo = photo;
  this.tags  = tags;
}

// Add listener and retrieve the vars
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method === 'getDOM') {
    artistName  = request.name;
    artistPhoto = request.photo;
    artistURL   = request.url;
    artistTags  = request.tags;
  }
});

// Band-related functions
function createBand() {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.executeScript(tab.id, { file: '/js/content_script.js' });
  });

  // Stupid integrity check. TODO: improve it
  if (window.artistPhoto !== undefined) {
    var band = new Band(artistName, artistURL, artistPhoto, artistTags); 
    saveBand(band);
  } else {
    messageOverlay('notvalid');
    return;
  }
}

function saveBand(band) {
  var duplicate = false;
  var bandName = band.name;

  storage.get('bands', function(data) {
    var bands = data.bands;

    if (typeof(bands) === 'undefined') {
      storage.set({ bands: musiqueueBands }, function() {
        console.log('I pushed an empty array');
      });
    } else {
      for (var i = 0; i < bands.length; i++) {
        var Band = bands[i];
        if (Band.name === bandName) {
          duplicate = true;
          break;
        }
      }
    }

    if (duplicate) {
      console.log('this band is already there!');
      messageOverlay('duplicate');
    } else {
      musiqueueBands.push(band);

      storage.set({ bands: musiqueueBands }, function() {
        console.log('saved ' + band.name);
        messageOverlay('success');
      });
    }
  });
}

function getBands(callback) {
  storage.get('bands', function(data) {

    bands = data.bands;

    callback();
  });
}

function removeBand(bandName) {
  storage.get('bands', function(data) {
    var bands = data.bands;

    for (var i = 0; i < bands.length; i++) {
      var band = bands[i];
      if (band.name === bandName) {
        bands.splice(i, 1);
        break;
      }
    }

    storage.set({ bands: bands }, function() {
      musiqueueBands = bands;
    }); 
  });
}

// Popup DOM helper function
function messageOverlay(result) {
  var views = chrome.extension.getViews({ type: "popup" });
  for (var i = 0; i < views.length; i++) {
    
    var container = views[i].document.getElementById('container');
    var overlay   = $(container).find('.overlay');

    overlay.fadeIn();

    switch (result) {
      case 'success':
        overlay.find('#saved').fadeIn();
        break;
      case 'duplicate':
        overlay.find('#duplicate').fadeIn();
        break;
      case 'notvalid':
        overlay.find('#notvalid').fadeIn();
        break;
      default:
        overlay.find('#unknown').fadeIn();
        break;
    }
  }
}

// Helper function to restore musiqueueBands
// array each time the extension is run, in
// order to avoid data flushing at every restart
function restoreSavedBands() {
  storage.get('bands', function(data) {
    musiqueueBands = data.bands;
  });
}