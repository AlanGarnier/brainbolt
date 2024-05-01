
from ..services.user_service import UserService
from flask_jwt_extended import create_access_token
import bcrypt

# Call UserService
user_service = UserService


# Function to crypt the password
def crypt_password(password):
    # Convert password
    password_encode = password.encode('utf8')
    # Generate the salt
    salt = bcrypt.gensalt(8)
    # Hash the password
    return bcrypt.hashpw(password_encode, salt)


class AuthService:
    @staticmethod
    def register(data):
        # Try to register a user
        pseudo = data.get('pseudo')
        # Check if the user is already registered
        already_registered = user_service.find_user({'pseudo': pseudo})
        if already_registered is not None:
            return {"message": "Pseudo already exists. Choose a different one."}, 400
        else:
            # Password encryption before registration
            password = crypt_password(data.get('password'))
            # Set user data
            user_data = {
                "pseudo": data.get('pseudo'),
                "email": data.get('email'),
                "picture": data.get('picture'),
                "score": data.get('score'),
                "password": password,
            }
            response = user_service.create_user(user_data)
            # Return a JSON response
            return response

    @staticmethod
    def login(data):
        # Get user credentials
        login = data.get('email')
        password = data.get('password')
        # Get user from credentials
        user = user_service.find_user_credentials({"email": login}, {'_id': 1, "email": 1, "password": 1})
        # Check is the user is found
        if user is None:
            message = {"User not found. Check your login and try again"}
            return message, 400
        else:
            # Encode password entered by user
            encoded_pwd = password.encode('utf8')
            # Check between password entered and password in database
            result = bcrypt.checkpw(encoded_pwd, user[0]['password'])
            if not result:
                message = {"The entered password is incorrect. Check your password and try again"}
                return message, 401
            else:
                # Make user authentication
                user_id = str(user[0]['_id'])
                access_token = create_access_token(identity=user_id)
                print(access_token)
                return access_token, 200
