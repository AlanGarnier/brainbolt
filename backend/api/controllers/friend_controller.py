from flask import request, jsonify, Blueprint
from ..services.friend_service import FriendService

friend_api = Blueprint("friend", __name__)


@friend_api.route('/api/friends/add_friend', methods=['POST'])
def add_friend():
    user_id = request.json.get('user_id')
    friend_id = request.json.get('friend_id')

    if user_id == friend_id:
        return jsonify({'error': "You can't send a friend request to yourself"}), 401

    if user_id and friend_id:
        try:
            if FriendService.friend_request_exists(user_id, friend_id):
                return jsonify({'error': 'Friend request already sent'}), 401

            new_friendship = FriendService(user_id, friend_id)
            new_friendship.save()
            return jsonify({'message': 'Friend request sent successfully'}), 201
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Missing user_id or friend_id'}), 400


@friend_api.route('/api/friends/pending_requests/<string:user_id>', methods=['GET'])
def get_pending_requests(user_id):
    if user_id:
        pending_requests = FriendService.get_pending_requests(user_id)
        return jsonify({'pending_requests': pending_requests}), 200
    else:
        return jsonify({'error': 'Missing user_id'}), 400


@friend_api.route('/api/friends/received_requests/<string:user_id>', methods=['GET'])
def get_received_requests(user_id):
    if user_id:
        received_requests = FriendService.get_received_requests(user_id)
        return jsonify({'received_requests': received_requests}), 200
    else:
        return jsonify({'error': 'Missing user_id'}), 400


@friend_api.route('/api/friends/accepted_requests/<string:user_id>', methods=['GET'])
def get_accepted_requests(user_id):
    if user_id:
        accepted_requests = FriendService.get_friends(user_id)
        return jsonify({'accepted_requests': accepted_requests}), 200
    else:
        return jsonify({'error': 'Missing user_id'}), 400


@friend_api.route('/api/friends/accept_friend', methods=['POST'])
def accept_friend():
    user_id = request.json.get('user_id')
    friend_id = request.json.get('friend_id')

    if user_id and friend_id:
        FriendService.accept_request(user_id, friend_id)
        return jsonify({'message': 'Friend request accepted successfully'}), 200
    else:
        return jsonify({'error': 'Missing user_id or friend_id'}), 400


@friend_api.route('/api/friends/reject_friend', methods=['POST'])
def reject_friend():
    user_id = request.json.get('user_id')
    friend_id = request.json.get('friend_id')

    if user_id and friend_id:
        FriendService.reject_request(user_id, friend_id)
        return jsonify({'message': 'Friend request rejected successfully'}), 200
    else:
        return jsonify({'error': 'Missing user_id or friend_id'}), 400


@friend_api.route('/api/friends/remove_friend_request', methods=['POST'])
def remove_friend_request():
    user_id = request.json.get('user_id')
    friend_id = request.json.get('friend_id')

    if user_id and friend_id:
        message, status = FriendService.remove_friend_request(user_id, friend_id)
        return jsonify(message), status
    else:
        return jsonify({'error': 'Missing user_id or friend_id'}), 400


@friend_api.route('/api/friends/delete_friend', methods=['DELETE'])
def delete_friend():
    user_id = request.json.get('user_id')
    friend_id = request.json.get('friend_id')

    if user_id and friend_id:
        message, status = FriendService.delete_friend(user_id, friend_id)
        return jsonify(message), status
    else:
        return jsonify({'error': 'Missing user_id or friend_id'}), 400
