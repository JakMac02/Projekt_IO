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
    iconUrl: 'shirt.png',
	iconSize:     [60, 60],
});

var wardrobeIcon = L.icon({
    iconUrl: 'cupboard.png',
	iconSize:     [45, 60],
});

var cupboardIcon = L.icon({
    iconUrl: 'wardrobe.png',
	iconSize:     [36, 60],
});

let buty = "Buty"

//Najlepiej pobrac z bazy okreslone oferty i wyświetlac iteracyjnie. 
//Imo tak jak teraz może być jedynie na zasadzie pretotypu
var schoesOfferData = ["Buty", 'Jan Kowalski', 'Chcę oddać stare buty. Są w niezłym stanie. Korzystałem z nich przez 4 sezony.'];
var schoesOffer = L.marker([52.225,21.005], {icon: schoesIcon}).addTo(map);
schoesOffer.bindPopup('<center> Buty <br><br>'
	+ 'Jan Kowalski<br>'
	+ 'Chcę oddać stare buty. Są w niezłym stanie<br>'
	+ '<a onclick="slideBar(schoesOfferData[0], schoesOfferData[1], schoesOfferData[2]) ">'
	+ "<button class=\"button\">Odbierz</button> </a>")

var shirtOfferData = ["Koszulka", 'Adam Nowak', 'Chcę oddać prawie nową koszulę. Jest w super stanie. W zamian rządam jedyne tabliczki czekolady :))'];
var shirtOffer = L.marker([52.2246,21.008], {icon: shirtIcon}).addTo(map);
shirtOffer.bindPopup('<center> Koszulka <br><br>'
	+ 'Adam Nowak<br>'
	+ 'Chcę oddać prawie nową koszulę. Jest w super stanie<br>'
	+ '<a onclick="slideBar(shirtOfferData[0], shirtOfferData[1], shirtOfferData[2]) ">'
	+ "<button class=\"button\">Odbierz</button> </a>")

var wardrobeOfferData = ["Szafa", 'Janusz Nowakowski', 'Chcę oddać starą szafę. Jest w niezłym stanie. Jest w akceptowalnym stanie. Jej wysokość to 3 metry, jest duża :))'];
var wardrobeOffer = L.marker([52.22057,21.01026], {icon: wardrobeIcon}).addTo(map);
wardrobeOffer.bindPopup('<center> Szafa <br><br>'
	+ 'Janusz Nowakowski<br>'
	+ 'Chcę oddać starą szafę. Jest w niezłym stanie<br>'
	+ '<a onclick="slideBar(wardrobeOfferData[0], wardrobeOfferData[1], wardrobeOfferData[2]) ">'
	+ "<button class=\"button\">Odbierz</button> </a>")

var cupboardOfferData = ["Szafka", 'John Doe', 'Hi everyone! I really want to get rid of that cupboard. Recently, I have bought the new one. So, please, take it to your house:)'];
var cupboardOffer = L.marker([52.222573,21.00963], {icon: cupboardIcon}).addTo(map);
cupboardOffer.bindPopup('<center> Szafka <br><br>'
	+ 'John Doe<br>'
	+ 'I have old cupboard. <br>'
	+ '<a onclick="slideBar(cupboardOfferData[0], cupboardOfferData[1], cupboardOfferData[2]) ">'
	+ "<button class=\"button\">Odbierz</button> </a>")

function slideBar(Title, Author, Description) {
	document.getElementById("sidebar").style.width = "20%";
	document.getElementById("map").style.marginLeft= "20%";
	document.getElementById('Title').innerText = Title;
	document.getElementById('Author').innerText = Author;
	document.getElementById('Description').innerText = Description;
};
