import secrets
import datetime

from dotenv import load_dotenv

# Load environment variables
load_dotenv()


class AuthConfig:
    # Set up the Flask-JWT-Extended configuration
    jwt_secret_key = secrets.token_hex(32)
    jwt_access_token_expires = datetime.timedelta(minutes=15)
    jwt_refresh_token_expires = datetime.timedelta(days=1)
