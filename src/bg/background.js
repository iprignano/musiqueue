'use strict';

// Initialize chrome storage, array containing bands and global vars
var storage = chrome.storage.sync;
var musiqueueBands = [];
var artistName,
    artistPhoto,
    artistURL,
    artistTags,
    bands;

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

  // Inject it, doc, fast!
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.executeScript(tab.id, { file: '/js/content_script.js' }, function() {});
  });

  // Stupid integrity check. TODO: improve it
  if (window.artistPhoto != undefined) {
    var band = new Band(artistName, artistURL, artistPhoto, artistTags); 
    saveBand(band);
  } else {
    console.log('no!');
    return;
  }
}

function saveBand(band) {
  // Push the new record to the Array
  musiqueueBands.push(band);

  storage.set({ bands: musiqueueBands }, function() {
    console.log('saved ' + band.name);
  });
}

function getBands(callback) {
  storage.get('bands', function(data) {
    // Store bands objects in a var for later use (in popup.js)
    bands = data.bands;

    callback();
  });
}

function removeBand(bandName) {
  storage.get('bands', function(data) {
    var bands = data.bands;

    // Search for the band index
    for (var i = 0; i < bands.length; i++) {
      var band = bands[i];
      if (band.name === bandName) {
        bands.splice(i, 1);
        break;
      } else {
        console.log(band);
      }
    }

    storage.set({ bands: bands }, function() {
      console.log('removed');
      console.log('updated array is');
      console.dir(bands);
    }); 
  });
}