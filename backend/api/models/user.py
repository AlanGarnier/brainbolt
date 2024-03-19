# RESOURCES
from backend.api.config import db

# Get reference to 'jeux' collection
users_collection = db.joueurs


class UserModel:
    @staticmethod
    def create_user(data):
        users_collection.insert_one(data)
        print('User created successfully')

    @staticmethod
    def get_all_users(users_ids):
        users = list(users_collection.find(users_ids))
        return users

    @staticmethod
    def get_one_user(id):
        return users_collection.find_one({"_id": id})

    @staticmethod
    def delete_user(id):
        return users_collection.delete_one({"_id": id})

    @staticmethod
    def update_user(id, data):
        return users_collection.update_one({"_id": id}, {"$set": data})
