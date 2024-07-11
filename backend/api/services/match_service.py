from ..config.database import db
from ..models.match import Match
from pydantic import ValidationError
from bson.objectid import ObjectId

# Get reference to 'match' collection
match_collection = db.match


class MatchService:
    @staticmethod
    def create_match(data):
        try:
            # Check JSON data with Pydantic match Model
            Match(**data)
            # Save the match to the database, etc.
            res = match_collection.insert_one(data)
            # Return a JSON response
            return res.inserted_id, 200
        except ValidationError as e:
            # If the JSON data doesn't match the Pydantic model, return a 400 Bad Request response
            return {"message": str(e.errors()[0]['msg'])}, 400

    @staticmethod
    def get_all_matches():
        # Get all matches
        match = list(match_collection.find())
        if match:
            # Return match list
            return match, 200
        else:
            return {"message": "An error occurred while retrieving all match: no match in database"}, 400

    @staticmethod
    def get_all_user_matches(user_id):
        # Get all matches
        match = list(match_collection.find({"_id": ObjectId(user_id)}))
        if match:
            # Return match list
            return match, 200
        else:
            return {"message": "An error occurred while retrieving all match: no match in database"}, 400
    @staticmethod
    def get_one_match(id):
        # Retrieve one match
        object_id = ObjectId(id)
        match = match_collection.find_one({"_id": object_id})
        if match:
            # Return match
            return match, 200
        else:
            # Return error message
            return {"message": "An error occurred while retrieving the match " + id + ": match not found"}, 400

    @staticmethod
    def delete_match(id):
        # Delete a match
        result = match_collection.delete_one({"_id": ObjectId(id)})
        if result.deleted_count == 1:
            return {"message": "Match deleted successfully"}, 200
        else:
            return {"message": "An error occurred while deleting the match " + id + ": match not deleted"}, 400

    @staticmethod
    def update_match(id, data):
        # Update a match
        result = match_collection.update_one({"_id": ObjectId(id)}, {"$set": data})
        if result.modified_count == 1:
            return {"message": "Match updated successfully"}, 200
        else:
            return {"message": "An error occurred while updating the match " + id + ": match not updated"}, 400
