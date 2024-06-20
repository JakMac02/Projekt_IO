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

function onEachFeature(feature, layer) {
    layer.bindPopup(feature.properties.description);    
};

var Availability = '';

async function answerToTheOffer(Title, Author, Description, Availability) {
	document.getElementById("leftsidebar").style.width = "20%";
	document.getElementById("map").style.marginLeft= "20%";
	document.getElementById('Title').innerText = Title;
	document.getElementById('Author').innerText = Author;
	document.getElementById('Description').innerText = Description;
	
	let AvailabilityList = document.getElementById('Availability');
	Terms = Availability.split(",");
	console.log(Availability);
	while (AvailabilityList.firstChild) {
		AvailabilityList.removeChild(AvailabilityList.firstChild);
	};
	console.log(Availability);
	if (Terms.length == 1) {
		let option = document.createElement('option');
		option.innerText = 'Zawsze';
		AvailabilityList.appendChild(option);
	}
	else if (Terms.length == 2) {
		let option = document.createElement('option');
		option.innerText = Terms[0];
		AvailabilityList.appendChild(option);
	}
	else {
		for (i = 0; i < Terms.length; ++i) {
			let option = document.createElement('option');
			option.innerText = Terms[i];
			AvailabilityList.appendChild(option);
		}
	};
	
	console.log(Title, Author, Description)
};

function addOffer() {
    console.log("Dodaj Ogłoszenie!");
	document.getElementById("rightsidebar").style.width = "20%";
	document.getElementById("map").style.marginRight= "20%";
	document.getElementById("buttonAdd").style.visibility= "hidden";
};

function getOffers(){
	$.ajax({
		type: "POST",
		url: "/offers",
		data: {},
		success: function(response) {
			var offers_from_database = response.ogl_json;
			for (i in offers_from_database) {
				offer = offers_from_database[i];
				var icon;

				switch(offer.category) {
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
					case "hardware":
						icon = toolsIcon;
						break;
					default:
						icon = miscellaneousIcon;
						break;
				};
				offer = offers_from_database[i];
				
				coordinates = offer.geometry.coordinates;
				lat = parseFloat(offer.geometry.coordinates[1]);
				lon = parseFloat(offer.geometry.coordinates[0]);

				
				var offerMarker = L.marker([lat, lon], {icon: icon});
				offerMarker.addTo(map);
				popup = '';
				popup = '<center><h1><b>' +
					offer.title + '</h1></b>'
					+ '<b>Opis</b> ' + '<br><em>' + offer.description + '</em><br><br>';
				
				var availability = '';
				var Availability = '';
				if (offer.availability == 0) {
					availability += '<b>Termin odbioru</b><br>' + 'Zawsze';
				}
				else if (typeof offer.availability == 'object') {
					popup += '<b>Terminy odbioru</b>';
					for (i in offer.availability) {
						availability += '<br>' + i + ': ' + offer.availability[i].start + ' - ' + offer.availability[i].end;
						Availability += i + ': ' + offer.availability[i].start + ' - ' + offer.availability[i].end + ',';
					}
				}
				else if (typeof offer.availability == 'string') {
					availability += '<b>Termin odbioru</b>' + '<br>' + offer.availability;
					Availability = offer.availability + ',';
				};
					console.log(Availability);
				popup += availability + '<br><br>' + '<b>Autor</b><br>';
				
				if (offer.author == '0') {
					popup += '<em>Nieznany</em>';
					autor = 'Nieznany Autor';
				}
				else {
					popup += offer.author;
					autor = offer.author.toString();
				};
				
				popup += '<br><a onclick="answerToTheOffer(' + "'" 
					+ offer.title.toString() + "'" + ',' + "'"
					+ autor + "'" 
					+ ',' + "'" + offer.description.toString() + "'" 
					+ ',' + "'" + Availability + "'" 
					+ ') ">'
					+ "<br><button class=\"button\" id=\"buttonGet\">Odbierz</button> </a></center>";
				offerMarker.bindPopup(popup);
			}
		}
	});
};

getOffers()

function insertOffer(){
	var title = document.getElementById("title").value;	
	var type = document.getElementById('category');
	var category = type.options[type.selectedIndex].value;
	var term1 = document.getElementById('date1').value;
	var description = document.getElementById("description").value;
	var lat = document.getElementById("lat").value;
	var lng = document.getElementById("lng").value;
	var data = {
				'author': 0,
				'category': category,
				'title': title,
				'description' : description,
				'photos' : "NULL",
				'geometry' : {
					"coordinates": [
						parseFloat(lng), parseFloat(lat)
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
			//addMarkerToMap(data);
		}, 
		error: function(error) { 
			console.log(error); 
		} 
	});
	location.reload();
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

var chosenPlaceMarker = L.circle([0, 0], {
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