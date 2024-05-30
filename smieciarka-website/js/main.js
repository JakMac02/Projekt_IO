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
    iconUrl: 'Originals/shirt.png',
	iconSize:     [60, 60],
});

var wardrobeIcon = L.icon({
    iconUrl: 'Originals/cupboard.png',
	iconSize:     [45, 60],
});

var cupboardIcon = L.icon({
    iconUrl: 'Originals/wardrobe.png',
	iconSize:     [36, 60],
});

let buty = "Buty"

for (i in offers) {
	offer = offers[i];
	var icon;

	switch(offer.properties.category) {
	  case "clothes":
		icon = shirtIcon;
		break;
	  case "furniture":
		icon = wardrobeIcon;
		break;
	};

	offerMarker = L.marker([offer.geometry.coordinates[1], offer.geometry.coordinates[0]], {icon: icon});
	offerMarker.addTo(map)
	offerMarker.bindPopup(
			'<center>' +
			offer.properties.title + '<br>'
			+ 'Opis ' + '<br>' + offer.properties.description + '<br>'
			+ 'Termin odbioru ' + '<br>' + offer.properties.term + '<br>'
			+ 'Autor<br>' + offer.properties.author + '<br><a onclick="answerToTheOffer(' + "'" 
			+ offer.properties.title.toString() + "'" + ',' + "'" + offer.properties.author.toString() + "'" 
			+ ',' + "'" + offer.properties.description.toString() + "'" + ') ">'
			+ "<button class=\"button\" id=\"buttonGet\">Odbierz</button> </a></center>" 
	);
};

function onEachFeature(feature, layer) {
    layer.bindPopup(feature.properties.description);    
};

async function answerToTheOffer(Title, Author, Description) {
	document.getElementById("leftsidebar").style.width = "20%";
	document.getElementById("map").style.marginLeft= "20%";
	document.getElementById('Title').innerText = Title;
	document.getElementById('Author').innerText = Author;
	document.getElementById('Description').innerText = Description;
	console.log(Title, Author, Description)
};

function addOffer() {
    console.log("Dodaj Ogłoszenie!");
	document.getElementById("rightsidebar").style.width = "20%";
	document.getElementById("map").style.marginRight= "20%";
	document.getElementById("buttonAdd").style.visibility= "hidden";
};

function insertOffer(){
	var title = document.getElementById("title").value;
	
	var type = document.getElementsByTagName('select')[0].value;
	var term1 = document.getElementById('date1').value;
	var term3 = document.getElementById('date3').value;
	var term2 = document.getElementById('date2').value;
	var description = document.getElementById("description").value;
	
	console.log(title, ',', type, ',', term1, ',', term2, ',', term3, ',', photosList, ',', description);
}

const photosList = []

const fileSelector = document.getElementById('file-selector');
fileSelector.addEventListener('change', (event) => {
	const photosList = []
	const fileList = event.target.files;
	console.log(fileList)
	for (i = 0; i < fileList.length; i++) {
		photosList.push(fileList[i].name)
	}
	console.log(photosList)
});