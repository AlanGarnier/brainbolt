# Resources
from flask import Response
from flask import request
from flask import jsonify
from bson.json_util import dumps
from flask import Blueprint
from ..models.user import UserModel

user_api = Blueprint("users", __name__)


# User routes
@user_api.route("/api/users", methods=["GET", "POST"])
def users():
    if request.method == "GET":
        # Call the service
        users_id = request.args.get('_id')
        users_ids = {} if users_id is None else {'_id': users_id}
        users_data = UserModel.get_all_users(users_ids)
        response = Response(response=dumps(users_data), status=200, mimetype="application/json")
        return response
    else:
        # Insert one user
        _json = request.json
        UserModel.create_user(_json)
        # Call the service
        resp = jsonify({"message": "User added successfully"})
        resp.status = 200
        return resp


@user_api.route("/api/users/<string:id>", methods=["GET", "DELETE", "PUT"])
def one_users(id):
    # Get one user
    if request.method == "GET":
        # Call the service
        user = UserModel.get_one_user(id)
        response = Response(response=dumps(user), status=200, mimetype="application/json")
        return response

    # Delete one user
    if request.method == "DELETE":
        # Call the service
        UserModel.delete_user(id)

        resp = jsonify({"message": "User deleted successfully"})
        resp.status = 200
        return resp

    # Update one user
    if request.method == "PUT":
        # Call the service
        _json = request.json
        UserModel.update_user(id, _json)

        resp = jsonify({"message": "User updated successfully"})
        resp.status = 200
        return resp

