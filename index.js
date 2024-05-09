var map = L.map('map').setView([52.222, 21.01], 16);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var schoesIcon = L.icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Football_shoe.svg',
	iconSize:     [75, 45],
});

var shirtIcon = L.icon({
    iconUrl: 'shirtpng.png',
	iconSize:     [60, 60],
});

var wardrobeIcon = L.icon({
    iconUrl: 'cupboardpng.png',
	iconSize:     [45, 60],
});

var cupboardIcon = L.icon({
    iconUrl: 'wardrobepng.png',
	iconSize:     [36, 60],
});


//Najlepiej pobrac z bazy okreslone oferty i wyświetlac iteracyjnie. 
//Imo tak jak teraz może być jedynie na zasadzie pretotypu
var schoesOffer = L.marker([52.225,21.005], {icon: schoesIcon}).addTo(map);
schoesOffer.bindPopup("Ogłoszenie <br> ")

var shirtOffer = L.marker([52.2246,21.008], {icon: shirtIcon}).addTo(map);
shirtOffer.bindPopup("Ogłoszenie <br> ")

var wardrobeOffer = L.marker([52.22057,21.01026], {icon: wardrobeIcon}).addTo(map);
wardrobeOffer.bindPopup("Ogłoszenie <br> ")

var cupboardOffer = L.marker([52.222573,21.00963], {icon: cupboardIcon}).addTo(map);
cupboardOffer.bindPopup("Ogłoszenie <br> ")