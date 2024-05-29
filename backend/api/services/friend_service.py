import logging
from ..config.database import db
from bson.objectid import ObjectId
import datetime

# Get reference to 'friends' collection
friends_collection = db.friends

# Configure logging
logging.basicConfig(level=logging.DEBUG)

class FriendService:
    def __init__(self, user_id, friend_id, status='pending'):
        self.user_id = ObjectId(user_id)
        self.friend_id = ObjectId(friend_id)
        self.status = status
        self.created_at = datetime.datetime.now()

    def save(self):
        friends_collection.insert_one({
            'user_id': self.user_id,
            'friend_id': self.friend_id,
            'status': self.status,
            'created_at': self.created_at
        })

    @staticmethod
    def friend_request_exists(user_id, friend_id):
        user_id = ObjectId(user_id)
        friend_id = ObjectId(friend_id)
        existing_request = friends_collection.find_one({
            'user_id': user_id,
            'friend_id': friend_id,
            'status': 'pending'
        })
        return existing_request is not None

    @staticmethod
    def get_pending_requests(user_id):
        user_id = ObjectId(user_id)
        pending_requests = list(friends_collection.find({'user_id': user_id, 'status': 'pending'}))
        return FriendService.convert_to_json_compatible(pending_requests)

    @staticmethod
    def accept_request(user_id, friend_id):
        user_id = ObjectId(user_id)
        friend_id = ObjectId(friend_id)
        friends_collection.update_one(
            {'user_id': friend_id, 'friend_id': user_id, 'status': 'pending'},
            {'$set': {'status': 'accepted'}}
        )

    @staticmethod
    def reject_request(user_id, friend_id):
        user_id = ObjectId(user_id)
        friend_id = ObjectId(friend_id)
        friends_collection.delete_one({'user_id': friend_id, 'friend_id': user_id, 'status': 'pending'})

    @staticmethod
    def remove_friend_request(user_id, friend_id):
        user_id = ObjectId(user_id)
        friend_id = ObjectId(friend_id)
        friends_collection.delete_one({'user_id': user_id, 'friend_id': friend_id, 'status': 'pending'})
        return {'message': 'Friend request removed successfully'}, 200

    @staticmethod
    def convert_to_json_compatible(data):
        """
        Convert MongoDB documents (BSON) to a format that is JSON serializable.
        """
        def convert(doc):
            if isinstance(doc, list):
                return [convert(item) for item in doc]
            elif isinstance(doc, dict):
                return {key: convert(value) for key, value in doc.items()}
            elif isinstance(doc, ObjectId):
                return str(doc)
            elif isinstance(doc, datetime.datetime):
                return doc.isoformat()
            else:
                return doc

        return convert(data)
