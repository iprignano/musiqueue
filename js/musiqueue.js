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
  var band = new Band(name, url, photo);

  saveBand(band);
}

// Make it persistant
function saveBand(band) {
  // Push the new record to the Array
  musiqueueBands.push(band);

  console.log(band);

  // Save it with chrome API
  storage.set({ 'bands':musiqueueBands }, function(data) {
    console.log('saved!');
  });
}

// List the bands
function listBands() {
  list = storage.get('bands', function(data) {
    console.log(data);
  });
}

// Events    =============================

$('#save').on('click', function() {
  chrome.tabs.query({'active': true}, function (tabs) {
    var url = tabs[0].url;

    createBand('The Smiths', url, 'Photos');
  });
});

$('#browse').on('click', function() {
  listBands();
});