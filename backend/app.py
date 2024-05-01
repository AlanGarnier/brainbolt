# RESOURCES
from flask import Flask
from flask_jwt_extended import JWTManager
from api.controllers.game_controller import game_api
from api.controllers.user_controller import user_api
from api.controllers.auth_controller import auth_api

from api.config.auth import AuthConfig

app = Flask(__name__)

# Set all routes
app.register_blueprint(game_api)
app.register_blueprint(user_api)
app.register_blueprint(auth_api)

# Set JWT config
app.config["JWT_SECRET_KEY"] = AuthConfig.jwt_secret_key
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = AuthConfig.jwt_access_token_expires
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = AuthConfig.jwt_refresh_token_expires
jwt = JWTManager(app)

if __name__ == '__main__':
    app.run(debug=True)
