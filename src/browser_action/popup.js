// Get Background page reference

var BGPage = chrome.extension.getBackgroundPage();

// Bind clicks to background functions

$('#save').on('click', function() {
  BGPage.createBand();
});

$('#browse').on('click', function() {
  BGPage.getBands(function() {

    var bands = BGPage.bands;

    bands.map(function(band) {
      console.log(band);

      console.log(band.name);
      console.log(band.photo);
      console.log(band.url);
      console.log(band.tags);

      $('#main-popup').append(band.name + '<br />' + band.photo + '<br />' + band.url + '<br /><br />');
    });
  });
});
