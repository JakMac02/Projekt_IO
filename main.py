import pymongo
import json
from kategorie import kategorie
from pymongo import GEO2D
from flask import Flask, request, redirect, render_template, url_for, jsonify
from bson import json_util
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import gridfs

app = Flask(__name__, template_folder=r"Projekt_IO\templates", static_folder=r"Projekt_IO\static")

connection_string = "mongodb+srv://jedrzejpysiak:JacaGaming%212@smieciarka.3wt9l5s.mongodb.net/"
# connection = pymongo.MongoClient(connection_string)
client = pymongo.MongoClient(connection_string)

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
    #print(client.list_database_names())
except Exception as e:
    print(e)
    

db = client['smieciarka']


# def insert_ogloszenie(ogloszenie):
#     collection = db['ogloszenia']
#
#     with open(ogloszenie) as json_file:
#         o = json.load(json_file)
#
#     collection.insert_one(o)
#     print("Dodano ogłoszenie do bazy danych (kolekcja ogloszenia)")

@app.route('/')
def home():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    if username == 'admin' and password == 'password':  # Replace with actual validation logic
        return redirect(url_for('main'))

@app.route('/main')
def main():   
    return render_template('main.html')

@app.route('/offers', methods=['GET', 'POST'])
def offers():
    collection_ogl = db['ogloszenia']
    ogl = list(collection_ogl.find())
    ogl_json = json.loads(json_util.dumps(ogl))
    
    print(ogl_json)
    return jsonify({"ogl_json": ogl_json})
    

@app.route('/insert', methods=['POST']) 
def get_ogloszenie():
    data = request.get_json()
    author = data.get('author')
    category = data.get('category')
    title = data.get('title')
    description = data.get('description')
    photos = data.get('photos')
    latlon = data.get('geometry').get('coordinates')
    availability = data.get('availability')    
    print(latlon)
    print(type(latlon)) 
    print(data, author, category, title, description, photos, latlon, availability)
    lat = float(latlon[0])
    lon = float(latlon[1])
    
    o_dict = { "author": author,
				"category": category,
				"title": title,
				"description" : description,
				"photos" : "NULL",
				'geometry' : {
					"coordinates": [
						lat, lon
					],
					"type": "Point"
				  },
				"availability" : availability}
    
    o_json = json.dumps(o_dict)
    o = json.loads(o_json)
    
    
    collection_ogl = db['ogloszenia']
    collection_uz = db['uzytkownicy']
    fs = gridfs.GridFS(db)

    # Czytanie pliku GeoJSON

    # Czytanie ścieżek do zdjęć zawartych w pliku GeoJSON w parametre "photos"
    #photo_paths = o.get("photos", [])

    # Dodanie zdjęć do bazy danch i odczyanie ich ID
    """photo_ids = []
    for photo_path in photo_paths:
        with open(photo_path, 'rb') as photo_file:
            photo_id = fs.put(photo_file, filename=photo_path)
            photo_ids.append(str(photo_id))"""

    # Zamiana w parametrze "photos" ścieżek użytkownika na ID zdjęć w bazie danych
    #o["photos"] = photo_ids

    # Odczytanie autora ogłoszenia
    """author = o.get("author")
    if not author:
        print("Brak informacji o autorze ogłoszenia w GeoJSONie")
        return"""

    # Odnalezienie użytkownika (autora ogłosznia) w kolekcji użytkowników
    """uz_doc = collection_uz.find_one({"nickname": author})
    if not uz_doc:
        print(f"Nie znaleziono użytkownika o nicku: {author}")
        return"""

    # Dodanie posta do parametru "posts" w dokumencie użykownika
    collection_uz.update_one({"nickname": "NULL"},
                             {"$push": {"posts": o}})

    # Dodanie dokumentu do kolekcji ogłoszeń
    collection_ogl.insert_one(o)
    print("Dodano ogłoszenie do bazy danych (kolekcja ogloszenia)")
    return "dziala zaejebiscie"

# def insert_uzytkownik(uzytkownik):
#     collection = db['uzytkownicy']
#
#     with open(uzytkownik) as json_file:
#         uz = json.load(json_file)
#
#     collection.insert_one(uz)
#     print("Dodano użytkownika do bazy danych (kolekcja uzytkownicy)")

def insert_uzytkownik(uzytkownik):
    collection = db['uzytkownicy']
    fs = gridfs.GridFS(db)

    with open(uzytkownik) as json_file:
        uz = json.load(json_file)

    photo_paths = uz.get("picture", [])
    photo_ids = []
    for photo_path in photo_paths:
        with open(photo_path, 'rb') as photo_file:
            photo_id = fs.put(photo_file, filename=photo_path)
            photo_ids.append(str(photo_id))

    uz["picture"] = photo_ids

    collection.insert_one(uz)
    print("Dodano użytkownika do bazy danych (kolekcja uzytkownicy)")


# def insert_many_ogloszenia(ogloszenia):
#     collection = db['ogloszenia']
#     lista_ogloszen = []
#     with open(ogloszenia) as json_file:
#         ogl = json.load(json_file)
#
#     for i in ogl['ogloszenia']:
#         lista_ogloszen.append(i)
#
#     collection.insert_many(lista_ogloszen)
#     print("Dodano ogłoszenia do bazy danych (kolekcja ogloszenia)")


def insert_many_ogloszenia(json_file):
    with open(json_file) as file:
        data = json.load(file)
        ogloszenia = data.get("ogloszenia", [])
        collection_ogl = db['ogloszenia']
        collection_uz = db['uzytkownicy']
        fs = gridfs.GridFS(db)
        for ogloszenie in ogloszenia:
            photo_paths = ogloszenie.get("photos", [])
            photo_ids = []
            for photo_path in photo_paths:
                with open(photo_path, 'rb') as photo_file:
                    photo_id = fs.put(photo_file, filename=photo_path)
                    photo_ids.append(str(photo_id))
            ogloszenie["photos"] = photo_ids
            author = ogloszenie.get("author")
            if not author:
                print("Brak informacji o autorze ogłoszenia w GeoJSONie")
                continue
            uz_doc = collection_uz.find_one({"nickname": author})
            if not uz_doc:
                print(f"Nie znaleziono użytkownika o nicku: {author}")
                continue
            collection_uz.update_one({"nickname": author}, {"$push": {"posts": ogloszenie}})
        collection_ogl.insert_many(ogloszenia)
        print("Dodano ogłoszenia do bazy danych (kolekcja ogloszenia)")


# def insert_many_uzytkownicy(uzytkownicy):
#     with open(uzytkownicy, encoding='utf-8') as json_file:
#         data = json.load(json_file)
#         uzytkownicy = data.get("uzytkownicy", [])
#         for uzytkownik in uzytkownicy:
#             insert_uzytkownik(uzytkownik)


def insert_many_uzytkownicy(uzytkownicy):
    collection = db['uzytkownicy']
    lista_uzytkownikow = []
    with open(uzytkownicy, encoding='utf-8') as json_file:
        uz = json.load(json_file)

    for i in uz['uzytkownicy']:
        lista_uzytkownikow.append(i)

    collection.insert_many(lista_uzytkownikow)
    print("Dodano użytkowników do bazy danych (kolekcja uzytkownicy)")


def wyszukaj_ogloszenie(center, distance, kategoria=None):
    collection = db['ogloszenia']
    collection.create_index([("geometry.coordinates", GEO2D)])

    query = {"geometry.coordinates": {"$geoWithin": {"$centerSphere": [center, distance/6378.1]}}}  # wyszukanie w promieniu distance
    result_geo = collection.find(query)
    result_list = list(result_geo)

    ids_from_query1 = [doc["_id"] for doc in result_list]    # zapisanie _id wyników z wyszukiwania po geometrii

    if kategoria is not None:  # kategoria to lista wyszukiwanych kategorii (patrz kategorie.py)
        query2 = {"_id": {"$in": ids_from_query1}, "category": {"$in": kategoria}}  # wyszukanie po wybranych kateg

    else:
        query2 = {"_id": {"$in": ids_from_query1}, "category": {'$in': kategorie}}  # wyszukanie po wszystkich kateg

    result = list(collection.find(query2))

    return list(result)


# print(wyszukaj_ogloszenie([20.984, 52.244], 5, ["clothes"]))


# collection = db['ogloszenia']
# fs = gridfs.GridFS(db)

# with open(r'F:\zdjecia\komoda.jpg', 'rb') as image_file:
#     fs.put(image_file, filename="komoda.jpg")

# with open(r'F:\zdjecia\buty_zygzakmcqueen\buty_zygzakmcqueen.jpg', 'rb') as image_file:
#     fs.put(image_file, filename="butyzygzakmcqueen.jpg")

# image = fs.get_last_version(filename=filename)
#         with open(save_path, 'wb') as f:
#             f.write(image.read())

oglo1 = """{ "author": 0,
				"category": "type",
				"title": "title",
				"description" : "description",
				"photos" : "NULL",
				"geometry" : "NULL",
				"availability" : "NULL"}"""
# insert_uzytkownik("uzytkownik1.json")
#get_ogloszenie(oglo1)
# insert_many_uzytkownicy("uzytkownicy.json")
# insert_many_ogloszenia("ogloszenia.json"))

if __name__ == "__main__":
    app.run(debug=True)