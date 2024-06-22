var map = L.map(
	'map', {
		center: [52.220, 21.011], 
		zoomControl: false ,
		minZoom: 13,
		maxZoom: 17,
		maxBounds: [
        //south west
			[52.017, 20.737],
        //north east
			[52.361, 21.258]
        ], 
	}
);

const key = 'jGfOqGPMv9RV54EWyXtE';
const mtLayer = L.maptilerLayer({
	apiKey: key,
	style: "e6471f4f-29f8-4212-9120-26a47d13b86a",
}).addTo(map);

var lat;
var lon;

navigator.permissions && navigator.permissions.query({name: 'geolocation'})
    .then(
		function(PermissionStatus) {
			if (PermissionStatus.state == 'granted') {
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(showPosition);
				} else { 
					console.log("Błąd w centrowaniu mapy na twoją lokalizację.");
				}
			} else {
				map.setView([52.220, 21.011], 14);
			}
		}
	);

function showPosition(position) {
	lat = position.coords.latitude;
	lon = position.coords.longitude;
	map.setView([lat, lon], 14);
}