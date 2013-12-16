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
    // Get stuff from page

    // Logging for debug purposes - REMOVE THAT
    // console.log(request.name);
    // console.log(request.photo);
    // console.log(request.url);
    // console.log(request.tags);

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

    // Store the band in a var and save it
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

  // Save it with chrome API
  storage.set({ 'bands': musiqueueBands }, function() {
    console.log('saved ' + band.name);
  });
}

function getBands(callback) {
  // Retrieve all the saved bands
  storage.get('bands', function(data) {

    // Store bands objects in a var for later use (in popup.js)
    bands = data.bands;

    // Execute callback
    callback();
  });
}

function removeBand(band) {
  console.log('sto qua');

  var indexToRemove;

  // Retrieve all the saved bands
  storage.get('bands', function(data) {

    bands = data.bands;

    // Search for the band index
    $.map(bands, function(obj, index) {
      if(obj.name == band) {

        indexToRemove = index;
        return indexToRemove;
      }
    })

    console.log('indextoremove is ' + indexToRemove);

    // Remove it
    storage.remove('Autechre', function(data) {
      console.log('removed');
      console.log(bands);
    }); 
  });
}