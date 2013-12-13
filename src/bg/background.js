// Initialize storage and array containing bands

var storage = chrome.storage.sync;
var musiqueueBands = [];

// Band Object Constructor

function Band(name, url, photo) {
  this.name  = name;
  this.url   = url;
  this.photo = photo;
}

// Functions =============================

// Create the band to save
function createBand(name, url, photo) {

  // Inject it, doc, fast!
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.executeScript(tab.id, {file: "/js/content_script.js"}, function() { console.log('done'); });
  });

  // Add listener and retrieve the vars
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getDOM") {
      console.log(request.pill);
    }
  });

  var band = new Band(name, url, photo);

  saveBand(band);
}

// Make it persistant
function saveBand(band) {
  // Push the new record to the Array
  musiqueueBands.push(band);

  // Save it with chrome API
  storage.set({ 'bands':musiqueueBands }, function() {
    console.log('saved!');
  });
}

// List the bands
function listBands() {
  storage.get('bands', function(data) {

    bands = data.bands;

    // Loop through the bands and print them
    bands.map(function(band) {
      console.log(band);

      bandName  = band.name;
      bandPhoto = band.photo;
      bandUrl   = band.url;

      $('#main-popup').append(bandName + '<br />' + bandPhoto + '<br />' + bandUrl);
    });
  });
}