// $(function() {
//   console.log("Jake Weary working");
//
//   // Make a new map
//   var map = new google.maps.Map($('#map')[0], {
//     // Pass in parameters to the map
//     zoom: 12,
//     center: { lat: 51.506178, lng: -0.088369 }
//   });
//
//   // MAKE API REQUEST TO GET COORDINATES AND INFO FROM ALL PACKAGES
//   $.ajax({
//     method: "GET",
//     url: "http://localhost:3000/packages"
//   }).done(function(packages){
//     // console.log(data[0].lat);
//     // console.log(data[0].lng);
//
//     packages.forEach(function(package){
//
//       var position = { lat: parseFloat(package.lat), lng: parseFloat(package.lng) }
//
//       console.log(position);
//
//       var marker = new google.maps.Marker({
//         position: position,
//         map: map
//       });
//
//       var infoWindow = new google.maps.InfoWindow({
//         position: position,
//         content: package.contents
//       });
//
//       $(marker).click(function(){
//         console.log("Marker clicked");
//         infoWindow.open(map);
//       });
//
//     });
//
//   }).fail(function(err){
//     console.error(err);
//   });
//
//   // AS A CALLBACK OF THE API REQUEST, FOR EACH PACKAGE, CREATE A MARKER AND THEN SUBSEQUENTLY ADD AN EVENT LISTENER TO IT
//   // ALSO CREATE AN INFO WINDOW POPULATED FROM THE PACKAGE INFO.
//
// });


$(function() {
  console.log("Jake Weary working");
  createMap();
  getAndCreateMarkersAndInfoWindows();
  handleForm();
});

var map;
var currentInfoWindow;

function handleForm(){
  $('form').on('submit', function(){
    event.preventDefault();
    console.log("Form submitted");

    // FORM DATA
    var newPackage = {
      contents: $('.contents').val(),
      lat: $('.lat').val(),
      lng: $('.lng').val(),
    }

    console.log(newPackage);

    // Make ajax post request
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/packages",
      data: { package: newPackage }
    })
    .done(getAndCreateMarkersAndInfoWindows)
    .fail(function(err){
      console.error(err);
    });
  });
}

function createMap(){
  // Make a new map
  map = new google.maps.Map($('#map')[0], {
    // Pass in parameters to the map
    zoom: 12,
    center: { lat: 51.506178, lng: -0.088369 }
  });
}

function getAndCreateMarkersAndInfoWindows(){
  // MAKE API REQUEST TO GET COORDINATES AND INFO FROM ALL PACKAGES
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/packages"
  }).done(function(packages){

    packages.forEach(function(package){

      var position = { lat: parseFloat(package.lat), lng: parseFloat(package.lng) }

      console.log("Marker position: " + position);

      var marker = new google.maps.Marker({
        position: position,
        map: map
      });

      var infoWindow = new google.maps.InfoWindow({
        position: position,
        content: package.contents
      });

      // THIS WORKS - DON'T DELETE
      marker.addListener('click', function() {
      // console.log('Clicked marker');
      if(currentInfoWindow) currentInfoWindow.close();
      currentInfoWindow = infoWindow;
      infoWindow.open(map, marker);
      });

      // THIS DOESN'T WORK - WHY!
      // $(infoWindow).click(function(){
      //   console.log('Clicked marker');
      //   infoWindow.open(map, marker);
      // });

    });

  }).fail(function(err){
    console.error(err);
  });
}

function createInfoWindow(position, contents, callback){
  infoWindow = new google.maps.InfoWindow({
    position: position,
    content: contents
  });
  setTimeout(callback, 1000);
}

function addClickToMarker(){
  $('marker').click(function(){
    console.log("Marker clicked");
    infoWindow.open(map);
  });
}

function testCallback(){
  console.log("Callback fired");
}
