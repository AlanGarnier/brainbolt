from ..config.database import db
from ..models.user import User
from pydantic import ValidationError
from bson.objectid import ObjectId

# Get reference to 'users' collection
users_collection = db.users


class UserService:
    @staticmethod
    def create_user(data):
        try:
            # Check JSON data with Pydantic User Model
            User(**data)
            # Save the user to the database, etc.
            users_collection.insert_one(data)
            # Return a JSON response
            return {"message": "User added successfully"}, 200
        except ValidationError as e:
            # If the JSON data doesn't match the Pydantic model, return a 400 Bad Request response
            return {"message": str(e.errors()[0]['msg'])}, 400

    @staticmethod
    def get_all_users(users_ids):
        # Get all users
        users = list(users_collection.find(users_ids))
        if users:
            # Return users list
            return users, 200
        else:
            return {"message": "An error occurred while retrieving all users: no users in database"}, 400

    @staticmethod
    def find_user_by_id(id):
        # Retrieve one user
        object_id = ObjectId(id)
        user = users_collection.find_one({"_id": object_id})
        if user:
            # Return user
            return user, 200
        else:
            # Return error message
            return {"message": "An error occurred while retrieving the user " + id + ": user not found"}, 400

    @staticmethod
    def find_user(data):
        # Retrieve one user
        return users_collection.find_one(data)

    @staticmethod
    def find_user_credentials(data, args):
        # Retrieve one user
        return users_collection.find(data, args)

    @staticmethod
    def delete_user(id):
        # Delete a user
        result = users_collection.delete_one({"_id": ObjectId(id)})
        if result.deleted_count == 1:
            return {"message": "User deleted successfully"}, 200
        else:
            return {"message": "An error occurred while deleting the user " + id + ": user not deleted"}, 400

    @staticmethod
    def update_user(id, data):
        # Update a user
        result = users_collection.update_one({"_id": ObjectId(id)}, {"$set": data})
        if result.modified_count == 1:
            return {"message": "User updated successfully"}, 200
        else:
            return {"message": "An error occurred while updating the user " + id + ": user not updated"}, 400
