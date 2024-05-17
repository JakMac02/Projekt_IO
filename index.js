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

var offers = [
	{
      "type": "Feature",
      "properties": {
        "category": "clothes",
        "description": "Chcę oddać stare buty. Są w niezłym stanie",
        "photos": "IWNIOIWND898YTV97QEH380V23H8",
        "title": "Buty",
        "term": "Jak najszybciej",
		"author": "Jan Kowalski"
      },
      "geometry": {
        "coordinates": [
          21.005, 52.225
        ],
        "type": "Point"
      }
    },
	{
      "type": "Feature",
      "properties": {
        "category": "clothes",
        "description": "Chcę oddać prawie nową koszulę. Jest w super stanie",
        "photos": "IWNIOIWND898YTV97QEH380V23H8",
        "title": "Koszulka",
        "term": "Jak najszybciej",
		"author": "Adam Nowak"
      },
      "geometry": {
        "coordinates": [
          21.008,
		  52.2246
        ],
        "type": "Point"
      }
    },
	{
      "type": "Feature",
      "properties": {
        "category": "furniture",
        "description": "Chcę oddać starą szafę. Jest w niezłym stanie. Jest w akceptowalnym stanie. Jej wysokość to 3 metry, jest duża :))",
        "photos": "IWNIOIWND898YTV97QEH380V23H8",
        "title": "Szafa",
        "term": "Jak najszybciej",
		"author": "Janusz Nowakowski"
      },
      "geometry": {
        "coordinates": [
			21.01026,
			52.22057
			
        ],
        "type": "Point"
      }
    },
	{
      "type": "Feature",
      "properties": {
        "category": "furniture",
        "description": "Hi everyone! I really want to get rid of that cupboard. Recently, I have bought the new one. So, please, take it to your house:)",
        "photos": "IWNIOIWND898YTV97QEH380V23H8",
        "title": "Old cupboard",
        "term": "Jak najszybciej",
		"author": "John Doe"
      },
      "geometry": {
        "coordinates": [
			21.00963,
			52.222573
			
        ],
        "type": "Point"
      }
    },
	{
      "type": "Feature",
      "properties": {
       "category":"furniture",
	   "description":"Metr osiemdziesiąt, 3 szuflady",
	   "photos":"OWJPFEJF28902HF789H28IHF0293",
	   "title":"wysoka szuflada",
	   "term":"jak najszybciej",
	   "author":"Adam Małsysz",
      },
      "geometry": {
        "coordinates": [
			21.000,  
			52.230			
        ],
        "type": "Point"
      }
    },
	{
	"type": "Feature",
      "properties": {
       "category":"clothes",
	   "description":"lorem ipsum",
	   "photos":"IWNIOIWND898YTV97QEH380V23H8",
	   "title":"szybkie buty marki zygzak mcqueen",
	   "term":"jak najszybciej",
	   "author":"Robert Kubica",
      },
      "geometry": {
        "coordinates": [
			21.005, 
			52.225
        ],
        "type": "Point"
      }
    },
]

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
			+ 'Autor<br>' + offer.properties.author + '<br><a onclick="slideBar(' + "'" 
			+ offer.properties.title.toString() + "'" + ',' + "'" + offer.properties.author.toString() + "'" 
			+ ',' + "'" + offer.properties.description.toString() + "'" + ') ">'
			+ "<button class=\"button\">Odbierz</button> </a></center>" 
	);
};

function onEachFeature(feature, layer) {
    layer.bindPopup(feature.properties.description);    
};


async function slideBar(Title, Author, Description) {
	document.getElementById("sidebar").style.width = "20%";
	document.getElementById("map").style.marginLeft= "20%";
	document.getElementById('Title').innerText = Title;
	document.getElementById('Author').innerText = Author;
	document.getElementById('Description').innerText = Description;
	console.log(Title, Author, Description)
};
