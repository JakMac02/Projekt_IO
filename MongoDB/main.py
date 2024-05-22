import pymongo
import json
from kategorie import kategorie
from pymongo import GEO2D
import gridfs


connection_string = "mongodb+srv://jedrzejpysiak:JacaGaming%212@smieciarka.3wt9l5s.mongodb.net/"
# connection = pymongo.MongoClient(connection_string)

client = pymongo.MongoClient(connection_string)
db = client['smieciarka']

# def insert_ogloszenie(ogloszenie):
#     collection = db['ogloszenia']
#
#     with open(ogloszenie) as json_file:
#         o = json.load(json_file)
#
#     collection.insert_one(o)
#     print("Dodano ogłoszenie do bazy danych (kolekcja ogloszenia)")

def insert_ogloszenie(ogloszenie):
    collection_ogl = db['ogloszenia']
    collection_uz = db['uzytkownicy']
    fs = gridfs.GridFS(db)

    # Czytanie pliku GeoJSON
    with open(ogloszenie) as json_file:
        o = json.load(json_file)

    # Czytanie ścieżek do zdjęć zawartych w pliku GeoJSON w parametre "photos"
    photo_paths = o.get("photos", [])

    # Dodanie zdjęć do bazy danch i odczyanie ich ID
    photo_ids = []
    for photo_path in photo_paths:
        with open(photo_path, 'rb') as photo_file:
            photo_id = fs.put(photo_file, filename=photo_path)
            photo_ids.append(str(photo_id))

    # Zamiana w parametrze "photos" ścieżek użytkownika na ID zdjęć w bazie danych
    o["photos"] = photo_ids

    # Odczytanie autora ogłoszenia
    author = o.get("author")
    if not author:
        print("Brak informacji o autorze ogłoszenia w GeoJSONie")
        return

    # Odnalezienie użytkownika (autora ogłosznia) w kolekcji użytkowników
    uz_doc = collection_uz.find_one({"nickname": author})
    if not uz_doc:
        print(f"Nie znaleziono użytkownika o nicku: {author}")
        return

    # Dodanie posta do parametru "posts" w dokumencie użykownika
    collection_uz.update_one({"nickname": author},
                             {"$push": {"posts": o}})

    # Dodanie dokumentu do kolekcji ogłoszeń
    collection_ogl.insert_one(o)
    print("Dodano ogłoszenie do bazy danych (kolekcja ogloszenia)")

def insert_uzytkownik(uzytkownik):
    collection = db['uzytkownicy']

    with open(uzytkownik) as json_file:
        uz = json.load(json_file)

    collection.insert_one(uz)
    print("Dodano użytkownika do bazy danych (kolekcja uzytkownicy)")


def insert_many_ogloszenia(ogloszenia):
    collection = db['ogloszenia']
    lista_ogloszen = []
    with open(ogloszenia) as json_file:
        ogl = json.load(json_file)

    for i in ogl['ogloszenia']:
        lista_ogloszen.append(i)

    collection.insert_many(lista_ogloszen)
    print("Dodano ogłoszenia do bazy danych (kolekcja ogloszenia)")


def insert_many_uzytkownicy(uzytkownicy):
    collection = db['uzytkownicy']
    lista_uzytkownikow = []
    with open(uzytkownicy) as json_file:
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


print(wyszukaj_ogloszenie([20.984, 52.244], 5, ["clothes"]))

collection = db['ogloszenia']
fs = gridfs.GridFS(db)

# with open(r'F:\zdjecia\komoda.jpg', 'rb') as image_file:
#     fs.put(image_file, filename="komoda.jpg")

# with open(r'F:\zdjecia\buty_zygzakmcqueen\buty_zygzakmcqueen.jpg', 'rb') as image_file:
#     fs.put(image_file, filename="butyzygzakmcqueen.jpg")

# image = fs.get_last_version(filename=filename)
#         with open(save_path, 'wb') as f:
#             f.write(image.read())

# insert_ogloszenie("ogloszenie.json")
