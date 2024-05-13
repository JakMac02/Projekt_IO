import pymongo
import json

connection_string = "mongodb+srv://jedrzejpysiak:JacaGaming%212@smieciarka.3wt9l5s.mongodb.net/"
connection = pymongo.MongoClient(connection_string)

def insert_ogloszenie(ogloszenie):
    collection = connection.smieciarka.ogloszenia

    with open(ogloszenie) as json_file:
        o = json.load(json_file)

    collection.insert_one(o)
    print("Dodano ogłoszenie do bazy danych (kolekcja ogloszenia)")


def insert_uzytkownik(uzytkownik):
    collection = connection.smieciarka.uzytkownicy

    with open(uzytkownik) as json_file:
        uz = json.load(json_file)

    collection.insert_one(uz)
    print("Dodano użytkownika do bazy danych (kolekcja uzytkownicy)")


def insert_many_ogloszenia(ogloszenia):
    collection = connection.smieciarka.ogloszenia
    lista_ogloszen = []
    with open(ogloszenia) as json_file:
        ogl = json.load(json_file)

    for i in ogl['ogloszenia']:
        lista_ogloszen.append(i)

    collection.insert_many(lista_ogloszen)
    print("Dodano ogłoszenia do bazy danych (kolekcja ogloszenia)")


def insert_many_uzytkownicy(uzytkownicy):
    collection = connection.smieciarka.uzytkownicy
    lista_uzytkownikow = []
    with open(uzytkownicy) as json_file:
        uz = json.load(json_file)

    for i in uz['uzytkownicy']:
        lista_uzytkownikow.append(i)

    collection.insert_many(lista_uzytkownikow)
    print("Dodano użytkowników do bazy danych (kolekcja uzytkownicy)")



# with open("ogloszenia.json") as json_file:
#     ogl = json.load(json_file)
# for i in ogl['ogloszenia']:
#         print(i)

insert_many_uzytkownicy("uzytkownicy.json")