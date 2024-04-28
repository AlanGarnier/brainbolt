from ..config.database import db
from ..models.game import Game
from pydantic import ValidationError
from bson.objectid import ObjectId

# Get reference to 'games' collection
games_collection = db.games


class GameService:
    @staticmethod
    def create_game(data):
        try:
            # Check JSON data with Pydantic Game Model
            Game(**data)
            # Save the game to the database, etc.
            games_collection.insert_one(data)
            # Return a JSON response
            return {"message": "Game added successfully"}, 200
        except ValidationError as e:
            # If the JSON data doesn't match the Pydantic model, return a 400 Bad Request response
            return {"message": str(e.errors()[0]['msg'])}, 400

    @staticmethod
    def get_all_games(games_ids):
        # Get all games
        games = list(games_collection.find(games_ids))
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

    @staticmethod
    def delete_game(id):
        # Delete a game
        result = games_collection.delete_one({"_id": ObjectId(id)})
        if result.deleted_count == 1:
            return {"message": "Game deleted successfully"}, 200
        else:
            return {"message": "An error occurred while deleting the game " + id + ": game not deleted"}, 400

    @staticmethod
    def update_game(id, data):
        # Update a game
        result = games_collection.update_one({"_id": ObjectId(id)}, {"$set": data})
        if result.modified_count == 1:
            return {"message": "Game updated successfully"}, 200
        else:
            return {"message": "An error occurred while updating the game " + id + ": game not updated"}, 400