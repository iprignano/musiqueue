// Array containing all Bands records

var musiqueueBands = []

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

  console.log(band);
  saveBand(band);
}

// Save it to sessionStorage
function saveBand(band) {
  // Push the new record to the Array
  musiqueueBands.push(band);

  // Encode in JSON and save it
  sessionStorage.setItem('musiqueueBands', JSON.stringify(musiqueueBands));
}

// List the bands
function listBands() {
  list = JSON.parse(sessionStorage.getItem('musiqueueBands'));

  console.log(list);
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