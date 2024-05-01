# Resources
from flask import Response
from flask import request
from bson.json_util import dumps
from flask import Blueprint
from ..services.game_service import GameService

game_api = Blueprint("games", __name__)
# Call GameService
games_service = GameService


# Game routes
@game_api.route("/api/games", methods=["GET", "POST"])
def games():
    if request.method == "GET":
        # Call the service
        games_id = request.args.get('_id')
        games_ids = {} if games_id is None else {'_id': games_id}
        games_data, status_code = games_service.get_all_games(games_ids)
        return Response(response=dumps(games_data), status=status_code, mimetype="application/json")
    else:
        # Insert one game
        _json = request.json
        message, status_code = games_service.create_game(_json)
        return Response(message.get('message'), status_code, mimetype="application/json")


@game_api.route("/api/games/<string:id>", methods=["GET", "DELETE", "PUT"])
def one_games(id):
    # Get one game
    if request.method == "GET":
        # Call the service
        game, status_code = games_service.get_one_game(id)
        return Response(response=dumps(game), status=status_code, mimetype="application/json")

    # Delete one game
    if request.method == "DELETE":
        # Call the service
        message, status_code = games_service.delete_game(id)
        return Response(message.get('message'), status_code, mimetype="application/json")

    # Update one game
    if request.method == "PUT":
        # Call the service
        _json = request.json
        message, status_code = games_service.update_game(id, _json)
        return Response(message.get('message'), status_code, mimetype="application/json")
