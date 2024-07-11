# Resources
from flask import Response
from flask import request
from flask import jsonify
from bson.json_util import dumps
from flask import Blueprint
from ..services.user_service import UserService

user_api = Blueprint("users", __name__)
# Call UserService
user_service = UserService


# User routes
@user_api.route("/api/users", methods=["GET", "POST"])
def users():
    if request.method == "GET":
        # Call the service
        users_id = request.args.get('_id')
        users_ids = {} if users_id is None else {'_id': users_id}
        users_data, status_code = user_service.get_all_users(users_ids)
        return Response(response=dumps(users_data), status=status_code, mimetype="application/json")
    else:
        # Insert one user
        _json = request.json
        message, status_code = user_service.create_user(_json)
        return Response(message.get('message'), status_code, mimetype="application/json")


@user_api.route("/api/users/<string:id>", methods=["GET", "DELETE", "PUT"])
def one_users(id):
    # Get one user
    if request.method == "GET":
        # Call the service
        user, status_code = user_service.find_user_by_id(id)
        return Response(response=dumps(user), status=status_code, mimetype="application/json")

    # Delete one user
    if request.method == "DELETE":
        # Call the service
        message, status_code = user_service.delete_user(id)
        return Response(message.get('message'), status_code, mimetype="application/json")

    # Update one user
    if request.method == "PUT":
        # Call the service
        _json = request.json
        message, status_code = user_service.update_user(id, _json)
        return Response(message.get('message'), status_code, mimetype="application/json")


@user_api.route("/api/users/search", methods=["GET"])
def search_user():
    pseudo = request.args.get('pseudo')
    if not pseudo:
        return Response(response=dumps({"message": "Pseudo query parameter is required"}), status=400,
                        mimetype="application/json")

    users, status_code = user_service.search_user_by_pseudo(pseudo)
    return Response(response=dumps(users), status=status_code, mimetype="application/json")
