from ..config.database import db
from ..models.room import Room
from pydantic import ValidationError
from bson.objectid import ObjectId

# Get reference to 'room' collection
room_collection = db.room


class RoomService:
    @staticmethod
    def create_room(data):
        try:
            # Check JSON data with Pydantic Chat Model
            Room(**data)
            # Save the chat to the database, etc.
            res = room_collection.insert_one(data)
            # Return a JSON response
            return res.inserted_id, 200
        except ValidationError as e:
            # If the JSON data doesn't match the Pydantic model, return a 400 Bad Request response
            return {"message": str(e.errors()[0]['msg'])}, 400

    @staticmethod
    def get_all_rooms():
        rooms = list(room_collection.find())
        if rooms:
            # Return rooms list
            return rooms, 200
        else:
            return {"message": "An error occurred while retrieving all games: no games in database"}, 400

    @staticmethod
    def get_one_room(id):
        # Retrieve one chat
        object_id = ObjectId(id)
        room = room_collection.find_one({"_id": object_id})
        if room:
            # Return room
            return room, 200
        else:
            # Return error message
            return {"message": "An error occurred while retrieving the room " + id + ": chat not found"}, 400

    @staticmethod
    def delete_room(id):
        # Delete a room
        result = room_collection.delete_one({"_id": ObjectId(id)})
        if result.deleted_count == 1:
            return {"message": "Room deleted successfully"}, 200
        else:
            return {"message": "An error occurred while deleting the room " + id + ": chat not deleted"}, 400

    @staticmethod
    def update_room(id, data):
        # Update a chat
        result = room_collection.update_one({"_id": ObjectId(id)}, {"$set": data})
        if result.modified_count == 1:
            return {"message": "Room updated successfully"}, 200
        else:
            return {"message": "An error occurred while updating the room " + id + ": chat not updated"}, 400
