# RESOURCES
from flask import Flask
from flask_jwt_extended import JWTManager
from backend.api.controllers.user_controller import user_api
from backend.api.controllers.auth_controller import auth_api
from backend.api.controllers.friend_controller import friend_api
from backend.api.controllers.game_controller import game_api
from backend.api.controllers.message_controller import message_api
from backend.api.controllers.match_controller import match_api
from backend.api.controllers.room_controller import room_api
import os
from flask_socketio import SocketIO
from backend.api.config.auth import AuthConfig
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['MONGO_URI'] = os.getenv('MONGO_DB_CONN_STRING')
# CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")
# Set all routes
# app.register_blueprint(game_api)
app.register_blueprint(user_api)
app.register_blueprint(auth_api)
app.register_blueprint(friend_api)
app.register_blueprint(game_api)
app.register_blueprint(message_api)
app.register_blueprint(match_api)
app.register_blueprint(room_api)

# Set JWT config
app.config["JWT_SECRET_KEY"] = AuthConfig.jwt_secret_key
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = AuthConfig.jwt_access_token_expires
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = AuthConfig.jwt_refresh_token_expires
jwt = JWTManager(app)

@app.route("/health", methods=["GET"])
def check_api_health():
    return "OK"

import backend.api.controllers.gameplay_controller

if __name__ == '__main__':
    socketio.run(app)
