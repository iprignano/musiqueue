"use strict";

// Initialize chrome storage, array containing bands and global vars

var storage = chrome.storage.sync;
var musiqueueBands = [];
var artistName,
    artistPhoto,
    artistURL,
    artistTags;

// Band Object Constructor

function Band(name, url, photo, tags) {
  this.name  = name;
  this.url   = url;
  this.photo = photo;
  this.tags  = tags;
}

// Add listener and retrieve the vars

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == "getDOM") {
    // Get stuff from page

    // Logging for debug purposes - REMOVE THAT
    console.log(request.name);
    console.log(request.photo);
    console.log(request.url);
    console.log(request.tags);

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
    chrome.tabs.executeScript(tab.id, { file: "/js/content_script.js" }, function() { console.log('done'); });
  });

  // Store the band in a var and save it
  var band = new Band(artistName, artistURL, artistPhoto, artistTags); 

  saveBand(band);
}

function saveBand(band) {
  // Push the new record to the Array
  musiqueueBands.push(band);

  // Save it with chrome API
  storage.set({ 'bands': musiqueueBands }, function() {
    console.log('saved!');
  });
}

function listBands() {
  // Retrieve data from storage
  storage.get('bands', function(data) {

    var bands = data.bands;

    // Loop through the bands and print them
    bands.map(function(band) {
      console.log(band);

      var bandName  = band.name;
      var bandPhoto = band.photo;
      var bandUrl   = band.url;

      $('#main-popup').append(bandName + '<br />' + bandPhoto + '<br />' + bandUrl);
    });
  });
}