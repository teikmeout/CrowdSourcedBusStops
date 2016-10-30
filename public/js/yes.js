'use strict'

// DOM load listener
document.addEventListener('DOMContentLoaded', (event) =>  {
  console.log('DOM fully loaded');

});
// FUNCTION:
// ARGS:
// SOURCE: Google maps API
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
  showCurrentLatLng(uluru);
}

// FUNCTION: function that will display the current lat and long of dropped pin
// ARGS: ulu object that is used in initMap()
function showCurrentLatLng(ulu) {
  let $lat = document.getElementsByClassName('lat')[0];
  let $lng = document.getElementsByClassName('lng')[0];
  $lat.value = ulu.lat;
  $lng.value = ulu.lng;
}

