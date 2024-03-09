# RESOURCES

from flask import Flask
from backend.api.controllers.game import game_api
from backend.api.controllers.user import user_api


app = Flask(__name__)

# Set all routes
app.register_blueprint(game_api)
app.register_blueprint(user_api)


if __name__ == '__main__':
    app.run(debug=True)
