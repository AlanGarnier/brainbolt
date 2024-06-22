# Resources
from flask import Response
from flask import request
from bson.json_util import dumps
from flask import Blueprint
from ..services.room_service import RoomService

room_api = Blueprint("room", __name__)
room_service = RoomService

@room_api.route("/api/room", methods=["POST"])
def add_room():
    _json = request.json
    room, status_code = room_service.create_room(_json)
    return Response(response=dumps(room), status=status_code, mimetype="application/json")

@room_api.route("/api/room", methods=["GET"])
def get_rooms():
    rooms, status_code = room_service.get_all_rooms()
    return Response(response=dumps(rooms), status=status_code, mimetype="application/json")

@room_api.route("/api/room/<string:room_id>", methods=["GET"])
def get_room(room_id):
    room, status_code = room_service.get_one_chat(room_id)
    return Response(response=dumps(room), status=status_code, mimetype="application/json")
