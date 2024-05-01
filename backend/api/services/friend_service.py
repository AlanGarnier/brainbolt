from ..config.database import db
from ..models.friend import User
from pydantic import ValidationError
from bson.objectid import ObjectId

# Get reference to 'users' collection
friends_collection = db.friends


class FriendService:
    def __init__(self, user_id, friend_id, status='pending'):
        self.user_id = user_id
        self.friend_id = friend_id
        self.status = status

    def save(self):
        db.friends.insert_one({
            'user_id': self.user_id,
            'friend_id': self.friend_id,
            'status': self.status,
            'created_at': self.created_at
        })

    @staticmethod
    def get_friends(user_id):
        friends1 = list(friends_collection.find({'user_id': user_id, 'status': 'accepted'}));
        friends2 = list(friends_collection.find({'friend_id': user_id, 'status': 'accepted'}));
        return friends1 + friends2

    @staticmethod
    def get_pending_requests(user_id):
        return list(db.friends.find({'friend_id': user_id, 'status': 'pending'}))
    
    @staticmethod
    def accept_request(user_id, friend_id):
        friends_collection.update_one(
            {'user_id': friend_id, 'friend_id': user_id, 'status': 'pending'},
            {'$set': {'status': 'accepted'}}
        )

        # Update the status of the friend request to 'accepted' for the friend
        friends_collection.update_one(
            {'user_id': user_id, 'friend_id': friend_id, 'status': 'pending'},
            {'$set': {'status': 'accepted'}}
        )

        # Add each user to the other's list of accepted friends
        friends_collection.update_one(
            {'_id': ObjectId(user_id)},
            {'$addToSet': {'friends': ObjectId(friend_id)}}
        )

        friends_collection.update_one(
            {'_id': ObjectId(friend_id)},
            {'$addToSet': {'friends': ObjectId(user_id)}}
        )