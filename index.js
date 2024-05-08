var map = L.map('map').setView([52.222, 21.01], 16);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


var schoesIcon = L.icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Football_shoe.svg',
	iconSize:     [100, 60]
	
});

var marker = L.marker([52.225,21.005], {icon: schoesIcon}).addTo(map);