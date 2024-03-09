# RESOURCES
from backend.api.config import db

# Get reference to 'jeux' collection
games_collection = db.jeux


# Class
class GameModel:
    def __init__(self, name, icone, theme, classement):
        self.name = name
        self.icone = icone
        self.theme = theme
        self.classement = classement

    @staticmethod
    def create_game(data):
        games_collection.insert_one(data)
        print('Game created successfully')

    @staticmethod
    def get_all_games(games_ids):
        games = list(games_collection.find(games_ids))
        return games

    @staticmethod
    def get_one_game(id):
        return games_collection.find_one({"_id": id})

    @staticmethod
    def delete_game(id):
        return games_collection.delete_one({"_id": id})

    @staticmethod
    def update_game(id, data):
        return games_collection.update_one({"_id": id}, {"$set": data})
