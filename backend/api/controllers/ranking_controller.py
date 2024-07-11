from json import dumps
from flask import Response, request, jsonify, Blueprint
from ..services.user_service import UserService

user_service = UserService

ranking_api = Blueprint("ranking", __name__)

@ranking_api.route('/api/ranking', methods=['GET'])
def get_ranking():
    users_data, status_code = user_service.get_users_sorted_by_wins()
    return Response(response=dumps(users_data), status=status_code, mimetype="application/json")