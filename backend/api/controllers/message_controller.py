# Resources
from flask import Response
from flask import request
from bson.json_util import dumps
from flask import Blueprint
from ..services.message_service import MessagesService

message_api = Blueprint("message", __name__)
message_service = MessagesService

# Message routes
@message_api.route("/api/message", methods=["POST"])
def add_message():
    _json = request.json
    message, status_code = message_service.create_message(_json)
    return Response(response=dumps(message), status=status_code, mimetype="application/json")

@message_api.route("/api/message/<string:room_id>", methods=["GET"])
def get_messages(room_id):
    messages, status_code = message_service.get_all_messages(room_id)
    return Response(response=dumps(messages), status=status_code, mimetype="application/json")

@message_api.route("/api/message/<string:message_id>", methods=["GET"])
def delete(message_id):
    message, status_code = message_service.delete_message(message_id)
    return Response(response=dumps(message), status=status_code, mimetype="application/json")