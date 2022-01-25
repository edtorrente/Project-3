// call the '/get-json' api to retrieve the from databse
d3.json("/evMap").then(evStationCluster);

// ===============================
function evStationMarkers(jsonData) {
	var stationCoordinates = [];

	for (i = 0; i < 1000; i++) {
		var marker = L.marker([jsonData[i].latitude, jsonData[i].longitude]).bindPopup("<h3>Station ID: " +
			jsonData[i].stationID + "</h4>");

		stationCoordinates.push(marker);
	}

	mapMaker(L.layerGroup(stationCoordinates));
}

function evStationCluster(jsonData) {
	var clusterMarkers = L.markerClusterGroup();

	for (i = 0; i < jsonData.length; i++) {
		clusterMarkers.addLayer(L.marker([jsonData[i].latitude, jsonData[i].longitude]).bindPopup("<h3>Station ID: " +
			jsonData[i].stationID + "</h4>"))
	}

	mapMaker(clusterMarkers);
};

function mapMaker(stationLocations) {
	// Create the tile layer that will be the background of our map.
	var tile = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	});

	// Create a baseMaps object to hold the tile layer.
	var baseMaps = {
		"Map": tile
	};

	// Create an overlayMaps object to hold the earthquakeLocations layer.
	var overlayMaps = {
		"EV stations Maps": stationLocations
	};

	// Create the map object with options.
	var myMap = L.map("map", {
		center: [45.52, -122.67],
		zoom: 3,
		layer: [baseMaps, overlayMaps]
	});

	// Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
	L.control.layers(baseMaps, overlayMaps, {
		collapsed: false,
	}).addTo(myMap);
};

// ===================================================
// var myMap = L.map("map", {
// 	center: [45.52, -122.67],
// 	zoom: 3
// });

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// 	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(myMap);

// d3.json("/evtart = centerPt.y - lineLength / 2,
// 				res = [],
// 				i;Map").then(function (jsonData) {
// 	var markers = L.markerClusterGroup({
// 		spiderfyShapePositions: function (count, centerPt) {
// 			var distanceFromCenter = 35,
// 				markerDistance = 45,
// 				lineLength = markerDistance * (count - 1),
// 				lineS

// 			res.length = count;

// 			for (i = count - 1; i >= 0; i--) {
// 				res[i] = new Point(centerPt.x + distanceFromCenter, lineStart + markerDistance * i);
// 			}

// 			return res;
// 		}
// 	});

// 	for (i = 0; i < jsonData.length; i++) {
// 		markers.addLayer(L.marker([jsonData[i].latitude, jsonData[i].longitude]).bindPopup("<h3>Station ID: " +
// 			jsonData[i].stationID + "</h4>"))
// 	}
// 	myMap.addLayer(markers);
// });