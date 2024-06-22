# Resources
from flask import Response
from flask import request
from bson.json_util import dumps
from flask import Blueprint
from ..services.game_service import GameService

game_api = Blueprint("game", __name__)
game_service = GameService

# Game routes
@game_api.route("/api/game", methods=["GET"])
def get_games():
    game, status_code = game_service.get_all_games()
    return Response(response=dumps(game), status=status_code, mimetype="application/json")


@game_api.route("/api/game/<string:game_id>", methods=["GET"])
def get_game(game_id):
    game, status_code = game_service.get_one_game(game_id)
    return Response(response=dumps(game), status=status_code, mimetype="application/json")

