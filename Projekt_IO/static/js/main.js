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
						day = '';
						if (i == 'monday') {
							day = 'Poniedziałek';
						}
						else if (i == 'tuesday') {
							day = 'Wtorek';
						}
						else if (i == 'wednesday') {
							day = 'Środa';
						}
						else if (i == 'thursday') {
							day = 'Czwartek';
						}
						else if (i == 'friday') {
							day = 'Piątek';
						}
						else if (i == 'saturday') {
							day = 'Sobota';
						}
						else if (i == 'sunday') {
							day = 'Niedziela';
						};
						
						if (offer.availability[i].start != 'None' && offer.availability[i].end != 'None') {
							if (offer.availability[i].start == offer.availability[i].end) {
								availability += '<br>' + day + ': ' + offer.availability[i].start;
								Availability += day + ': ' + offer.availability[i].start + ',';
							}
							else {
								availability += '<br>' + day + ': ' + offer.availability[i].start + ' - ' + offer.availability[i].end;
								Availability += day + ': ' + offer.availability[i].start + ' - ' + offer.availability[i].end + ',';
							}
						}
						else if (offer.availability[i].start == 'None' && offer.availability[i].end != 'None') {
							availability += '<br>' + day + ': ' + offer.availability[i].end;
							Availability += day + ': ' + offer.availability[i].end + ',';
						}
						else if (offer.availability[i].start != 'None' && offer.availability[i].end == 'None') {
							availability += '<br>' + day + ': ' + offer.availability[i].start;
							Availability += day + ': ' + offer.availability[i].start + ',';
						}
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
	//var term1 = document.getElementById('date1').value;
	var description = document.getElementById("description").value;
	var lat = document.getElementById("lat").value;
	var lng = document.getElementById("lng").value;
	
	var monday_start = document.getElementById('start_monday').options[document.getElementById('start_monday').selectedIndex].value
	var tuesday_start  = document.getElementById('start_tuesday').options[document.getElementById('start_tuesday').selectedIndex].value
	var wednesday_start = document.getElementById('start_wednesday').options[document.getElementById('start_wednesday').selectedIndex].value
	var thursday_start = document.getElementById('start_thursday').options[document.getElementById('start_thursday').selectedIndex].value
	var friday_start = document.getElementById('start_friday').options[document.getElementById('start_friday').selectedIndex].value
	var saturday_start = document.getElementById('start_saturday').options[document.getElementById('start_saturday').selectedIndex].value
	var sunday_start = document.getElementById('start_sunday').options[document.getElementById('start_sunday').selectedIndex].value
	var monday_end = document.getElementById('end_monday').options[document.getElementById('end_monday').selectedIndex].value
	var tuesday_end = document.getElementById('end_tuesday').options[document.getElementById('end_tuesday').selectedIndex].value
	var wednesday_end = document.getElementById('end_wednesday').options[document.getElementById('end_wednesday').selectedIndex].value
	var thursday_end = document.getElementById('end_thursday').options[document.getElementById('end_thursday').selectedIndex].value
	var friday_end = document.getElementById('end_friday').options[document.getElementById('end_friday').selectedIndex].value
	var saturday_end = document.getElementById('end_saturday').options[document.getElementById('end_saturday').selectedIndex].value
	var sunday_end = document.getElementById('end_sunday').options[document.getElementById('end_sunday').selectedIndex].value
	
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
				"availability": {
					"monday": {
					  "start": monday_start,
					  "end": monday_end
					},
					"tuesday": {
					  "start": tuesday_start,
					  "end": tuesday_end
					},
					"wednesday": {
					  "start": wednesday_start,
					  "end": wednesday_end
					},
					"thursday": {
					  "start": thursday_start,
					  "end": thursday_end
					},
					"friday": {
					  "start": friday_start,
					  "end": friday_end
					},
					"saturday": {
					  "start": saturday_start,
					  "end": saturday_end
					},
					"sunday": {
					  "start": sunday_start,
					  "end": sunday_end
					}
				}
			   };
	$.ajax({ 
		url: '/insert', 
		type: 'POST',
		contentType: 'application/json',
		
		data: JSON.stringify(data), 
		success: function(response) { 
			console.log('Data sent to Flask:', response);
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

function addTerm() {
	let TermList = document.getElementById('term');
	let term = document.createElement('input');
	TermList.appendChild(term);
}

map.on('click', onMapClick);