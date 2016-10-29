'use strict'

// DOM load listener
document.addEventListener('DOMContentLoaded', (event) =>  {
  console.log('DOM fully loaded');

});
function initMap() {
  let uluru = {lat: 40.730610, lng: -73.935242};
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: uluru
  });
  let marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}

