from ..config.database import db
from ..models.matches import Matches
from pydantic import ValidationError
from bson.objectid import ObjectId

# Get reference to 'matches' collection
matches_collection = db.matches


class MatchesService:
    @staticmethod
    def create_match(data):
        try:
            # Check JSON data with Pydantic Matches Model
            Matches(**data)
            # Save the match to the database, etc.
            matches_collection.insert_one(data)
            # Return a JSON response
            return {"message": "Match added successfully"}, 200
        except ValidationError as e:
            # If the JSON data doesn't match the Pydantic model, return a 400 Bad Request response
            return {"message": str(e.errors()[0]['msg'])}, 400

    @staticmethod
    def get_all_matches(matches_ids):
        # Get all matches
        matches = list(matches_collection.find(matches_ids))
        if matches:
            # Return matches list
            return matches, 200
        else:
            return {"message": "An error occurred while retrieving all matches: no matches in database"}, 400

    @staticmethod
    def get_one_match(id):
        # Retrieve one match
        object_id = ObjectId(id)
        match = matches_collection.find_one({"_id": object_id})
        if match:
            # Return match
            return match, 200
        else:
            # Return error message
            return {"message": "An error occurred while retrieving the match " + id + ": match not found"}, 400

    @staticmethod
    def delete_match(id):
        # Delete a match
        result = matches_collection.delete_one({"_id": ObjectId(id)})
        if result.deleted_count == 1:
            return {"message": "Match deleted successfully"}, 200
        else:
            return {"message": "An error occurred while deleting the match " + id + ": match not deleted"}, 400

    @staticmethod
    def update_match(id, data):
        # Update a match
        result = matches_collection.update_one({"_id": ObjectId(id)}, {"$set": data})
        if result.modified_count == 1:
            return {"message": "Match updated successfully"}, 200
        else:
            return {"message": "An error occurred while updating the match " + id + ": match not updated"}, 400
