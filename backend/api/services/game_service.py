from ..config.database import db
from pydantic import ValidationError
from bson.objectid import ObjectId

# Get reference to 'games' collection
games_collection = db.games

class GameService:
    @staticmethod
    def get_all_games():
        # Get all games
        games = list(games_collection.find())
        if games:
            # Return games list
            return games, 200
        else:
            return {"message": "An error occurred while retrieving all games: no games in database"}, 400

    @staticmethod
    def get_one_game(id):
        # Retrieve one game
        object_id = ObjectId(id)
        game = games_collection.find_one({"_id": object_id})
        if game:
            # Return game
            return game, 200
        else:
            # Return error message
            return {"message": "An error occurred while retrieving the game " + id + ": game not found"}, 400

   