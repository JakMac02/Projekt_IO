var map = L.map('map').setView([52.222, 21.01], 16);

const key = 'jGfOqGPMv9RV54EWyXtE';
const mtLayer = L.maptilerLayer({
	apiKey: key,
	style: "e6471f4f-29f8-4212-9120-26a47d13b86a", //optional
}).addTo(map);
	  
var furnitureIcon = L.icon({
    iconUrl: 'Originals/furniture.png',
	iconSize:     [70, 70],
});	  
	  
var clothesIcon = L.icon({
    iconUrl: 'Originals/clothes.png',
	iconSize:     [70, 70],
});

var electronicsIcon = L.icon({
    iconUrl: 'Originals/electronics.png',
	iconSize:     [70, 70],
});

var gardeningIcon = L.icon({
    iconUrl: 'Originals/gardening.png',
	iconSize:     [70, 70],
});

var homeFurnishingsIcon = L.icon({
    iconUrl: 'Originals/home-furnishings.png',
	iconSize:     [70, 70],
});

var kidsIcon = L.icon({
    iconUrl: 'Originals/kids.png',
	iconSize:     [70, 70],
});

var mediaIcon = L.icon({
    iconUrl: 'Originals/media.png',
	iconSize:     [70, 70],
});

var miscellaneousIcon = L.icon({
    iconUrl: 'Originals/miscellaneous.png',
	iconSize:     [70, 70],
});
var petsIcon = L.icon({
    iconUrl: 'Originals/pets.png',
	iconSize:     [70, 70],
});

var sportIcon = L.icon({
    iconUrl: 'Originals/sport.png',
	iconSize:     [70, 70],
});

var toolsIcon = L.icon({
    iconUrl: 'Originals/tools.png',
	iconSize:     [70, 70],
});


let buty = "Buty"

for (i in offers) {
	offer = offers[i];
	var icon;

	switch(offer.properties.category) {
		case "clothes":
			icon = clothesIcon;
			break;
		case "furniture":
			icon = furnitureIcon;
			break;
		case "electronics":
			icon = electronicsIcon;
			break;
		case "gardening":
			icon = gardeningIcon;
			break;
		case "home-furnishings":
			icon = homeFurnishingsIcon;
			break;
		case "kids":
			icon = kidsIcon;
			break;
		case "media":
			icon = mediaIcon;
			break;
		case "miscellaneous":
			icon = miscellaneousIcon;
			break;
		case "pets":
			icon = petsIcon;
			break;
		case "sport":
			icon = sportIcon;
			break;
		case "tools":
			icon = toolsIcon;
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
	var description = document.getElementById("description").value;
	var latlon = document.getElementById("latlon").value;
	
	console.log(title, ',', type, ',', term1, ',', photosList, ',', description, ',', latlon);
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

function onMapClick(e) {
	document.getElementById("latlon").value = e.latlng;
};

map.on('click', onMapClick);