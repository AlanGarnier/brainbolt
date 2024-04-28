from ..config.database import db
from ..models.score import Score
from pydantic import ValidationError
from bson.objectid import ObjectId

# Get reference to 'score' collection
score_collection = db.score


class ScoreService:
    @staticmethod
    def create_score(data):
        try:
            # Check JSON data with Pydantic Score Model
            Score(**data)
            # Save the score to the database, etc.
            score_collection.insert_one(data)
            # Return a JSON response
            return {"message": "User added successfully"}, 200
        except ValidationError as e:
            # If the JSON data doesn't match the Pydantic model, return a 400 Bad Request response
            return {"message": str(e.errors()[0]['msg'])}, 400

    @staticmethod
    def get_all_scores(scores_ids):
        # Get all scores
        scores = list(score_collection.find(scores_ids))
        if scores:
            # Return scores list
            return scores, 200
        else:
            return {"message": "An error occurred while retrieving all scores: no scores in database"}, 400

    @staticmethod
    def get_one_score(id):
        # Retrieve one score
        object_id = ObjectId(id)
        score = score_collection.find_one({"_id": object_id})
        if score:
            # Return score
            return score, 200
        else:
            # Return error message
            return {"message": "An error occurred while retrieving the score " + id + ": score not found"}, 400

    @staticmethod
    def delete_score(id):
        # Delete a score
        result = score_collection.delete_one({"_id": ObjectId(id)})
        if result.deleted_count == 1:
            return {"message": "User deleted successfully"}, 200
        else:
            return {"message": "An error occurred while deleting the score " + id + ": score not deleted"}, 400

    @staticmethod
    def update_score(id, data):
        # Update a score
        result = score_collection.update_one({"_id": ObjectId(id)}, {"$set": data})
        if result.modified_count == 1:
            return {"message": "User updated successfully"}, 200
        else:
            return {"message": "An error occurred while updating the score " + id + ": score not updated"}, 400
