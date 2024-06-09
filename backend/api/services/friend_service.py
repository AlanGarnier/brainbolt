import logging
from ..config.database import db
from bson.objectid import ObjectId
import datetime

friends_collection = db.friends
users_collection = db.users

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
        
        # Fetch additional user information for each pending request
        additional_requests = []
        for request in pending_requests:
            friend_info = users_collection.find_one({'_id': request['friend_id']}, {'pseudo': 1, 'picture': 1})
            if friend_info:
                request['friend_pseudo'] = friend_info.get('pseudo')
                request['friend_picture'] = friend_info.get('picture')
            additional_requests.append(request)

        return FriendService.convert_to_json_compatible(additional_requests)
    
    @staticmethod
    def get_received_requests(user_id):
        user_id = ObjectId(user_id)
        received_requests = list(friends_collection.find({'friend_id': user_id, 'status': 'pending'}))
        
        additional_requests = []
        for request in received_requests:
            user_info = users_collection.find_one({'_id': request['user_id']}, {'pseudo': 1, 'picture': 1})
            if user_info:
                request['friend_pseudo'] = user_info.get('pseudo')
                request['friend_picture'] = user_info.get('picture')
            additional_requests.append(request)

        return FriendService.convert_to_json_compatible(additional_requests)
    
    @staticmethod
    def get_friends(user_id):
        user_id = ObjectId(user_id)
        accepted_requests = list(friends_collection.find({'user_id': user_id, 'status': 'accepted'}))
        
        additional_requests = []
        for request in accepted_requests:
            friend_info = users_collection.find_one({'_id': request['friend_id']}, {'pseudo': 1, 'picture': 1})
            if friend_info:
                request['friend_pseudo'] = friend_info.get('pseudo')
                request['friend_picture'] = friend_info.get('picture')
            additional_requests.append(request)

        return FriendService.convert_to_json_compatible(additional_requests)

    @staticmethod
    def accept_request(user_id, friend_id):
        user_id = ObjectId(user_id)
        friend_id = ObjectId(friend_id)
        friends_collection.update_one(
            {'user_id': user_id, 'friend_id': friend_id, 'status': 'pending'},
            {'$set': {'status': 'accepted'}}
        )
        # We also need to add the reverse relationship
        if not friends_collection.find_one({'user_id': friend_id, 'friend_id': user_id}):
            friends_collection.insert_one({
                'user_id': friend_id,
                'friend_id': user_id,
                'status': 'accepted',
                'created_at': datetime.datetime.now()
            })
        
        friend_info = users_collection.find_one({'_id': friend_id}, {'pseudo': 1, 'picture': 1})
        if friend_info:
            friend_info['user_id'] = str(user_id)
            friend_info['friend_id'] = str(friend_id)
            friend_info['status'] = 'accepted'
            friend_info['created_at'] = datetime.datetime.now().isoformat()
        
        return FriendService.convert_to_json_compatible(friend_info)


    @staticmethod
    def reject_request(user_id, friend_id):
        user_id = ObjectId(user_id)
        friend_id = ObjectId(friend_id)
        friends_collection.delete_one({'user_id': user_id, 'friend_id': friend_id, 'status': 'pending'})

    @staticmethod
    def remove_friend_request(user_id, friend_id):
        user_id = ObjectId(user_id)
        friend_id = ObjectId(friend_id)
        friends_collection.delete_one({'user_id': user_id, 'friend_id': friend_id, 'status': 'pending'})
        return {'message': 'Friend request removed successfully'}, 200
    
    @staticmethod
    def delete_friend(user_id, friend_id):
        user_id = ObjectId(user_id)
        friend_id = ObjectId(friend_id)
        result1 = friends_collection.delete_one({'user_id': user_id, 'friend_id': friend_id, 'status': 'accepted'})
        result2 = friends_collection.delete_one({'user_id': friend_id, 'friend_id': user_id, 'status': 'accepted'})
        if result1.deleted_count == 0 and result2.deleted_count == 0:
            return {'message': 'Friend not found'}, 404
        return {'message': 'Friend deleted successfully'}, 200

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
