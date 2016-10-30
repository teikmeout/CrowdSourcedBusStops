// DOM load listener
document.addEventListener('DOMContentLoaded', (event) =>  {
  console.log('DOM fully loaded');

});

// declaring params for geolocation
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

// FUNCTION:
function returnPositionObj(position) {
  console.log(`inserting lat: ${position.coords.latitude}, lng:${position.coords.longitude} `);
  // $target.innerHTML = `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`;
  let newObj = {lat: position.coords.latitude, lng: position.coords.longitude};
  console.log(newObj);
  return newObj;
}

function errLocation() {
  console.log('Error retrieving location');
}
// FUNCTION: uses HTML5 navigator to search for location and display it on map
// ARGS: none
function getLocation() {
  if (navigator.geolocation) {
    console.log('location tracking initiated');
    // navigator.geolocation.getCurrentPosition(returnPositionObj);
    navigator.geolocation.getCurrentPosition(returnPositionObj, errLocation, options);
  } else {
    $target.innerHTML = 'Location Tracking Failed';
  }
}


// FUNCTION:
// ARGS:
// SOURCE: Google maps API
function initMap() {
  console.log('running initMap');
  // let catchValues = getLocation();
  let uluru = getLocation();
  // let uluru = {lat: 40.730610, lng: -73.935242};
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: uluru
  });
  let marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
  // showCurrentLatLng(uluru);
}

// FUNCTION: function that will display the current lat and long of dropped pin
// ARGS: ulu object that is used in initMap()
// function showCurrentLatLng(ulu) {
//   const $lat = document.getElementsByClassName('lat')[0];
//   const $lng = document.getElementsByClassName('lng')[0];
//   $lat.value = ulu.lat;
//   $lng.value = ulu.lng;
// }

// declaring a pointer to lat and long definition
// const $target = document.getElementById('target');
