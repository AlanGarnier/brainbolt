from ..config.database import db
from ..models.chat import Chat
from pydantic import ValidationError
from bson.objectid import ObjectId


# Get reference to 'chats' collection
chats_collection = db.chat


class ChatService:
    @staticmethod
    def create_chat(data):
        try:
            # Check JSON data with Pydantic Chat Model
            Chat(**data)
            # Save the chat to the database, etc.
            chats_collection.insert_one(data)
            # Return a JSON response
            return {"message": "Chat added successfully"}, 200
        except ValidationError as e:
            # If the JSON data doesn't match the Pydantic model, return a 400 Bad Request response
            return {"message": str(e.errors()[0]['msg'])}, 400

    @staticmethod
    def get_one_chat(id):
        # Retrieve one chat
        object_id = ObjectId(id)
        chat = chats_collection.find_one({"_id": object_id})
        if chat:
            # Return chat
            return chat, 200
        else:
            # Return error message
            return {"message": "An error occurred while retrieving the chat " + id + ": chat not found"}, 400

    @staticmethod
    def delete_chat(id):
        # Delete a chat
        result = chats_collection.delete_one({"_id": ObjectId(id)})
        if result.deleted_count == 1:
            return {"message": "Chat deleted successfully"}, 200
        else:
            return {"message": "An error occurred while deleting the chat " + id + ": chat not deleted"}, 400

    @staticmethod
    def update_chat(id, data):
        # Update a chat
        result = chats_collection.update_one({"_id": ObjectId(id)}, {"$set": data})
        if result.modified_count == 1:
            return {"message": "Chat updated successfully"}, 200
        else:
            return {"message": "An error occurred while updating the chat " + id + ": chat not updated"}, 400
