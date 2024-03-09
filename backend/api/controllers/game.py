# Resources
from flask import Response
from flask import request
from flask import jsonify
from bson.json_util import dumps
from flask import Blueprint
from ..models.game import GameModel

game_api = Blueprint("games", __name__)


# Game routes
@game_api.route("/api/games", methods=["GET", "POST"])
def games():
    if request.method == "GET":
        # Call the service
        games_id = request.args.get('_id')
        games_ids = {} if games_id is None else {'_id': games_id}
        games_data = GameModel.get_all_games(games_ids)
        response = Response(response=dumps(games_data), status=200, mimetype="application/json")
        return response
    else:
        # Insert one game
        _json = request.json
        GameModel.create_game(_json)
        # Call the service
        resp = jsonify({"message": "Game added successfully"})
        resp.status = 200
        return resp


@game_api.route("/api/games/<string:id>", methods=["GET", "DELETE", "PUT"])
def one_games(id):
    # Get one game
    if request.method == "GET":
        # Call the service
        game = GameModel.get_one_game(id)
        response = Response(response=dumps(game), status=200, mimetype="application/json")
        return response

    # Delete one game
    if request.method == "DELETE":
        # Call the service
        GameModel.delete_game(id)

        resp = jsonify({"message": "Game deleted successfully"})
        resp.status = 200
        return resp

    # Update one game
    if request.method == "PUT":
        # Call the service
        _json = request.json
        GameModel.update_game(id, _json)

        resp = jsonify({"message": "Game updated successfully"})
        resp.status = 200
        return resp
