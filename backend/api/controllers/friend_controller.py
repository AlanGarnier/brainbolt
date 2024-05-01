from flask import request, jsonify
from flask import Response
from flask import request
from bson.json_util import dumps
from flask import Blueprint
from ..services.friend_service import FriendService

friend_api = Blueprint("friend", __name__)
@friend_api.route('/add_friend', methods=['POST'])
def add_friend():
    user_id = request.json.get('user_id')
    friend_id = request.json.get('friend_id')

    if user_id and friend_id:
        new_friendship = FriendService(user_id, friend_id)
        new_friendship.save()
        return {'message': 'Friend request sent successfully'}, 201
    else:
        return {'error': 'Missing user_id or friend_id'}, 400

@friend_api.route('/friends/<user_id>', methods=['GET'])
def get_friends(user_id):
    friends = FriendService.get_friends(user_id)
    return {'friends': friends}, 200

@friend_api.route('/pending_requests/<user_id>', methods=['GET'])
def get_pending_requests(user_id):
    pending_requests = FriendService.get_pending_requests(user_id)
    return {'pending_requests': pending_requests}, 200

@friend_api.route('/accept_friend', methods=['POST'])
def accept_friend():
    user_id = request.json.get('user_id')
    friend_id = request.json.get('friend_id')

    if user_id and friend_id:
        # Update the status of the friend request to 'accepted' for the current user
        FriendService.accept_request(user_id, friend_id)
        return {'message': 'Friend request accepted successfully'}, 200
    else:
        return {'error': 'Missing user_id or friend_id'}, 400