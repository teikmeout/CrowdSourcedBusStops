/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

// declaring params for geolocation
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

// FUNCTION:
// function returnPositionObj(position) {
//   console.log(`inserting lat: ${position.coords.latitude}, lng:${position.coords.longitude} `);
//   // $target.innerHTML = `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`;
//   let newObj = {lat: position.coords.latitude, lng: position.coords.longitude};
//   console.log(newObj);
//   return newObj;
// }

function errLocation() {
  console.log('Error retrieving location');
}
// FUNCTION: uses HTML5 navigator to search for location and display it on map
// ARGS: none
function getLocation() {
  if (navigator.geolocation) {
    console.log('location tracking initiated');
    // navigator.geolocation.getCurrentPosition(returnPositionObj);
    navigator.geolocation.getCurrentPosition(initMap, errLocation, options);
  } else {
    $target.innerHTML = 'Location Tracking Failed';
  }
}


// FUNCTION: callback function that creates a map with current location
// ARGS: position from getCurrentPosition
// SOURCE: Google maps API
function initMap(position) {
  console.log('running initMap');
  // setting GMaps coordinates taken from position argument
  let uluru = {lat: position.coords.latitude, lng: position.coords.longitude};
  // creating new map with GMaps creator and telling it where to appear
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 20,
    center: uluru
  });
  // determining marker position
  let marker = new google.maps.Marker({
    position: uluru,
    map: map,
    // this makes the marker a draggable item
    draggable: true,
    title: "Drag me!",
    label: "🍳",
  });
  // showing physical values to user inside of form
  const $lat = document.getElementsByClassName('lat')[0];
  const $lng = document.getElementsByClassName('lng')[0];
  $lat.value = uluru.lat;
  $lng.value = uluru.lng;

  // adding event listener for the drag release readjutment of values
  google.maps.event.addListener(marker, 'dragend', function (event) {
    // changing values inside of form
    $lat.value = this.getPosition().lat();
    $lng.value = this.getPosition().lng();
    console.log('got new values for lat and long');
  });
}
