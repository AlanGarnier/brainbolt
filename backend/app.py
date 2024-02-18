import os

from bson import ObjectId
from flask import Flask, Response, request, jsonify
from dotenv import load_dotenv
from pymongo import MongoClient
from bson.json_util import dumps

load_dotenv()

app = Flask(__name__)
mongo_db_url = os.environ.get("MONGO_DB_CONN_STRING")

# Récupération de la chaîne de connexion MongoDB
client = MongoClient(mongo_db_url)
# On affecte la base de donnees
db = client['BrainBolt']


# Game collection
@app.route('/api/games', methods=['GET', 'POST'])
def data():
    # Get all games
    if request.method == 'GET':
        games_id = request.args.get('_id')
        games_ids = {} if games_id is None else {'_id': games_id}
        games = list(db.jeux.find(games_ids))

        response = Response(
            response=dumps(games), status=200, mimetype='application/json')
        return response

    # Insert one game
    if request.method == 'POST':
        _json = request.json
        db.jeux.insert_one(_json)

        resp = jsonify({'message': 'Game added successfully'})
        resp.status = 200
        return resp


@app.route('/api/games/<string:id>', methods=['GET', 'DELETE', 'PUT'])
def one_data(id):
    # Get one game
    if request.method == 'GET':
        game = db.jeux.find({'_id': id})

        response = Response(
            response=dumps(game), status=200, mimetype='application/json')
        return response

    # Delete one game
    if request.method == 'DELETE':
        db.jeux.delete_one({'_id': id})

        resp = jsonify({'message': 'Game deleted successfully'})
        resp.status = 200
        return resp
    # Update one game
    if request.method == 'PUT':
        _json = request.json
        db.jeux.update_one({'_id': id}, {'$set': _json})

        resp = jsonify({'message': 'Game updated successfully'})
        resp.status = 200
        return resp


# Users collection
@app.route('/api/users', methods=['GET', 'POST'])
def data_users():
    # Get all users
    if request.method == 'GET':
        users_id = request.args.get('_id')
        users_ids = {} if users_id is None else {'_id': users_id}
        users = list(db.joueurs.find(users_ids))

        response = Response(
            response=dumps(users), status=200, mimetype='application/json')
        return response

    # Insert one user
    if request.method == 'POST':
        _json = request.json
        db.joueurs.insert_one(_json)

        resp = jsonify({'message': 'user added successfully'})
        resp.status = 200
        return resp


@app.route('/api/users/<string:id>', methods=['GET', 'DELETE', 'PUT'])
def one_data_users(id):
    # Get one user
    if request.method == 'GET':
        user = db.joueurs.find({'_id': id})

        response = Response(
            response=dumps(user), status=200, mimetype='application/json')
        return response

    # Delete one user
    if request.method == 'DELETE':
        db.joueurs.delete_one({'_id': id})

        resp = jsonify({'message': 'user deleted successfully'})
        resp.status = 200
        return resp
    # Update one user
    if request.method == 'PUT':
        _json = request.json
        db.joueurs.update_one({'_id': id}, {'$set': _json})

        resp = jsonify({'message': 'user updated successfully'})
        resp.status = 200
        return resp


# message collection
@app.route('/api/messages', methods=['GET', 'POST'])
def data_messages():
    # Get all messages
    if request.method == 'GET':
        messages_id = request.args.get('_id')
        messages_ids = {} if messages_id is None else {'_id': messages_id}
        messages = list(db.messages.find(messages_ids))

        response = Response(
            response=dumps(messages), status=200, mimetype='application/json')
        return response

    # Insert one message
    if request.method == 'POST':
        _json = request.json
        db.messages.insert_one(_json)

        resp = jsonify({'message': 'message added successfully'})
        resp.status = 200
        return resp


@app.route('/api/messages/<string:id>', methods=['GET', 'DELETE', 'PUT'])
def one_data_messages(id):
    # Get one message
    if request.method == 'GET':
        message = db.messages.find({'_id': id})

        response = Response(
            response=dumps(message), status=200, mimetype='application/json')
        return response

    # Delete one message
    if request.method == 'DELETE':
        db.messages.delete_one({'_id': id})

        resp = jsonify({'message': 'message deleted successfully'})
        resp.status = 200
        return resp
    # Update one message
    if request.method == 'PUT':
        _json = request.json
        db.messages.update_one({'_id': id}, {'$set': _json})

        resp = jsonify({'message': 'message updated successfully'})
        resp.status = 200
        return resp


# Parties collection
@app.route('/api/game-session', methods=['GET', 'POST'])
def data_session():
    # Get all game-session
    if request.method == 'GET':
        game_session_id = request.args.get('_id')
        game_session_ids = {} if game_session_id is None else {'_id': game_session_id}
        game_session = list(db.parties.find(game_session_ids))

        response = Response(
            response=dumps(game_session), status=200, mimetype='application/json')
        return response

    # Insert one game
    if request.method == 'POST':
        _json = request.json
        db.parties.insert_one(_json)

        resp = jsonify({'message': 'Game added successfully'})
        resp.status = 200
        return resp


@app.route('/api/game-session/<string:id>', methods=['GET', 'DELETE'])
def one_data_session(id):
    # Get one game session
    if request.method == 'GET':
        session = db.jeux.find({'_id': id})

        response = Response(
            response=dumps(session), status=200, mimetype='application/json')
        return response

    # Delete one game session
    if request.method == 'DELETE':
        db.parties.delete_one({'_id': id})

        resp = jsonify({'message': 'game session deleted successfully'})
        resp.status = 200
        return resp

