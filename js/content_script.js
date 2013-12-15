// Get stuff from DOM

var artistName  = getName();
var artistPhoto = getPhoto();
var artistURL   = window.location.href;
var artistTags  = getTags();

// Send it to background.js

chrome.runtime.sendMessage({ 
  method: "getDOM",
  name  : artistName,
  url   : artistURL,
  photo : artistPhoto,
  tags  : artistTags
});

// Helpers

function getName() {
  var rawName = $('header.page-head h1').text();
  return $.trim(rawName);
}

function getPhoto() {
  return $('.resource-images a.hero-image img').attr('src');
}

function getTags() {
  var tags = [];

  // Get only the first three tags
  $('.global-tags ul.tags li:lt(3) a').each(function() {
    tags.push($(this).text());
  });

  return JSON.stringify(tags);
}