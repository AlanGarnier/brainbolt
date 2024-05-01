# RESOURCES
from flask import Flask
from flask_jwt_extended import JWTManager
from backend.api.controllers.game_controller import game_api
from backend.api.controllers.user_controller import user_api
from backend.api.controllers.auth_controller import auth_api
from backend.api.controllers.friend_controller import friend_api
import os
from backend.api.config.auth import AuthConfig
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['MONGO_URI'] = os.getenv('MONGO_DB_CONN_STRING')
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
# Set all routes
app.register_blueprint(game_api)
app.register_blueprint(user_api)
app.register_blueprint(auth_api)
app.register_blueprint(friend_api)

# Set JWT config
app.config["JWT_SECRET_KEY"] = AuthConfig.jwt_secret_key
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = AuthConfig.jwt_access_token_expires
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = AuthConfig.jwt_refresh_token_expires
jwt = JWTManager(app)

@app.route("/health", methods=["GET"])
def check_api_health():
    return "OK"

# if __name__ == '__main__':
#     app.run(host="0.0.0.0", port=5001)
