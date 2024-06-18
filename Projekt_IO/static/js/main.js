var furnitureIcon = L.icon({
    iconUrl: '/static/img/furniture.png',
	iconSize:     [70, 70],
});	  
	  
var clothesIcon = L.icon({
    iconUrl: '/static/img/clothes.png',
	iconSize:     [70, 70],
});

var electronicsIcon = L.icon({
    iconUrl: '/static/img/electronics.png',
	iconSize:     [70, 70],
});

var gardeningIcon = L.icon({
    iconUrl: '/static/img/gardening.png',
	iconSize:     [70, 70],
});

var homeFurnishingsIcon = L.icon({
    iconUrl: '/static/img/home-furnishings.png',
	iconSize:     [70, 70],
});

var kidsIcon = L.icon({
    iconUrl: '/static/img/kids.png',
	iconSize:     [70, 70],
});

var mediaIcon = L.icon({
    iconUrl: '/static/img/media.png',
	iconSize:     [70, 70],
});

var miscellaneousIcon = L.icon({
    iconUrl: '/static/img/miscellaneous.png',
	iconSize:     [70, 70],
});
var petsIcon = L.icon({
    iconUrl: '/static/img/pets.png',
	iconSize:     [70, 70],
});

var sportIcon = L.icon({
    iconUrl: '/static/img/sport.png',
	iconSize:     [70, 70],
});

var toolsIcon = L.icon({
    iconUrl: '/static/img/tools.png',
	iconSize:     [70, 70],
});


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

	var offerMarker = L.marker([offer.geometry.coordinates[1], offer.geometry.coordinates[0]], {icon: icon});
	console.log(offerMarker);
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
	var lat = document.getElementById("lat").value;
	var lng = document.getElementById("lng").value;
	var data = {
				'author': 0,
				'category': type,
				'title': title,
				'description' : description,
				'photos' : "NULL",
				'geometry' : {
					"coordinates": [
						parseFloat(lat), parseFloat(lng)
					],
					"type": "Point"
				},
				'availability' : term1};
	$.ajax({ 
		url: '/insert', 
		type: 'POST',
		contentType: 'application/json',
		
		data: JSON.stringify(data), 
		success: function(response) { 
			console.log('Data sent to Flask:', response);
			addMarkerToMap(data);
		}, 
		error: function(error) { 
			console.log(error); 
		} 
	});
	offers.push(data);
	console.log(offers);
	console.log(data);

	var icon;

	switch(data.category) {
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

	var dataMarker = L.marker([parseFloat(data.geometry.coordinates[0]), parseFloat(data.geometry.coordinates[1])], {icon: icon});
	console.log(dataMarker);
	dataMarker.addTo(map);
	dataMarker.bindPopup(
		'<center>' +
		data.title + '<br>'
		+ 'Opis ' + '<br>' + data.description + '<br>'
		+ 'Termin odbioru ' + '<br>' + data.term + '<br>'
		+ 'Autor<br>' + data.author + '<br><a onclick="answerToTheOffer(' + "'" 
		+ data.title.toString() + "'" + ',' + "'" + data.author.toString() + "'" 
		+ ',' + "'" + data.description.toString() + "'" + ') ">'
		+ "<button class=\"button\" id=\"buttonGet\">Odbierz</button> </a></center>" 
);

};




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

chosenPlaceMarker = L.circle([0, 0], {
    color: '#3a4931',
    fillColor: '#3a4931',
    fillOpacity: 1,
    radius: 10
})

function onMapClick(e) {
	var lat = (e.latlng.lat);
    var lng = (e.latlng.lng);
	var newLatLng = new L.LatLng(lat, lng);
	document.getElementById("lat").value = lat
	document.getElementById("lng").value = lng
	chosenPlaceMarker.setLatLng(newLatLng).addTo(map);
};

map.on('click', onMapClick);