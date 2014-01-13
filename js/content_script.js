'use strict';

// Get stuff from DOM
var artistName  = getName();
var artistPhoto = getPhoto();
var artistURL   = window.location.href;
var artistTags  = getTags();

// Send it to background.js
chrome.runtime.sendMessage({ 
  method: 'getDOM',
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

  $('.global-tags ul.tags li:lt(3) a').each(function(i) {
    var tagsText = $(this).text();
    var charCount = tagsText.length;

    if (charCount < 25) {
      tags.push(tagsText);
    } else {
      // Toooo long. Can you feel it?
    }
  });

  return tags;
}