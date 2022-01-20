// adding tile layer

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
})
  
// initialize all of the LayerGroups we'll be using
var layers = {
  chargingStation: new L.LayerGroup(),
  carbonEmission: new L.LayerGroup()
};

// create the map with our layers
var map = L.map("map", {
  center: [38.4955861,-99.4411381],
  zoom: 5,
  layers: [
    layers.chargingStation,
    layers.carbonEmission
  ]
});

// add our 'lightmap' tile layer to the map
lightmap.addTo(map);

// create an overlays object to add to the layer control
var overlays = {
  "Charging Stations": layers.chargingStation,
  "Carbon Emissions": layers.carbonEmission
};

// create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(map);

// pipe in data from url
const url = "/Stations";

// grab data with d3
d3.json(url, function(data) {
  
    // Create a new marker cluster group
    var markers = L.markerClusterGroup();
    // Loop through data
    for (var i = 0; i < data.length; i++) {
  
      // Set the data location property to a variable
      var latitude = data[i].latitude;
      var longitude = data[i].longitude;
      var station = data[i].station_name;
      console.log("latittude:", latitude);
      console.log("longitude: ", longitude);
      console.log("station: ", station);

      var location = [];
      location.push(latitude)
      location.push(longitude)
  
      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([latitude, longitude])
        .bindPopup(data[i].station_name));
      }
  
  // Add our marker cluster layer to the map
  map.addLayer(markers);

});