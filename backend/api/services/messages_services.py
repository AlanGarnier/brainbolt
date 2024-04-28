from ..config.database import db
from ..models.messages import Messages
from pydantic import ValidationError
from bson.objectid import ObjectId

# Get reference to 'messages' collection
messages_collection = db.messages


class MessagesService:
    @staticmethod
    def create_message(data):
        try:
            # Check JSON data with Pydantic Messages Model
            Messages(**data)
            # Save the message to the database, etc.
            messages_collection.insert_one(data)
            # Return a JSON response
            return {"message": "Meassage added successfully"}, 200
        except ValidationError as e:
            # If the JSON data doesn't match the Pydantic model, return a 400 Bad Request response
            return {"message": str(e.errors()[0]['msg'])}, 400

    @staticmethod
    def get_all_messages(messages_ids):
        # Get all messages
        messages = list(messages_collection.find(messages_ids))
        if messages:
            # Return messages list
            return messages, 200
        else:
            return {"message": "An error occurred while retrieving all messages: no messages in database"}, 400

    @staticmethod
    def get_one_message(id):
        # Retrieve one message
        object_id = ObjectId(id)
        message = messages_collection.find_one({"_id": object_id})
        if message:
            # Return message
            return message, 200
        else:
            # Return error message
            return {"message": "An error occurred while retrieving the message " + id + ": message not found"}, 400

    @staticmethod
    def delete_message(id):
        # Delete a message
        result = messages_collection.delete_one({"_id": ObjectId(id)})
        if result.deleted_count == 1:
            return {"message": "Meassage deleted successfully"}, 200
        else:
            return {"message": "An error occurred while deleting the message " + id + ": message not deleted"}, 400
