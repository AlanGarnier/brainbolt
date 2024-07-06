# Resources
from flask import Response
from flask import request
from bson.json_util import dumps
from flask import Blueprint
from ..services.match_service import MatchService

match_api = Blueprint("match", __name__)
match_service = MatchService


# Game routes
@match_api.route("/api/match", methods=["POST"])
def add_match():
    _json = request.json
    match, status_code = match_service.create_match(_json)
    return Response(response=dumps(match), status=status_code, mimetype="application/json")


@match_api.route("/api/match", methods=["GET"])
def get_matches():
    matches, status_code = match_service.get_all_matches()
    return Response(response=dumps(matches), status=status_code, mimetype="application/json")


@match_api.route("/api/<string:user_id>", methods=["GET"])
def get_user_matches(user_id):
    matches, status_code = match_service.get_all_user_matches(user_id)
    return Response(response=dumps(matches), status=status_code, mimetype="application/json")

@match_api.route("/api/match/<string:match_id>", methods=["GET", "DELETE", "PUT"])
def get_match(match_id):
    if request.method == "GET":
        match, status_code = match_service.get_one_match(match_id)
        return Response(response=dumps(match), status=status_code, mimetype="application/json")
    # Delete match
    elif request.method == "DELETE":
        # Call the service
        match, status_code = match_service.delete_match(id)
        return Response(response=dumps(match), status=status_code, mimetype="application/json")
    # Update match
    elif request.method == "PUT":
        # Call the service
        _json = request.json
        match, status_code = match_service.delete_match(id, _json)
        return Response(response=dumps(match), status=status_code, mimetype="application/json")
