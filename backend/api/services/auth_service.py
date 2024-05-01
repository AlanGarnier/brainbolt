
from ..services.user_service import UserService
from flask_jwt_extended import create_access_token
import bcrypt
import io
import urllib.request
from PIL import Image

def is_valid_image_url(url):
    try:
        # Open the image URL
        with urllib.request.urlopen(url) as response:
            img_data = response.read()
        # Check if the content type indicates it's an image
        img = Image.open(io.BytesIO(img_data))
        img.verify()  # Verify if it's a valid image
        return True
    except Exception as e:
        return False

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
        email = data.get('email')
        # Check if the user is already registered
        if user_service.find_user({'pseudo': pseudo}) and user_service.find_user({'email': email}):
            return {"message": "Pseudo and email already exists. Choose a different one."}, 400
        elif user_service.find_user({'pseudo': pseudo}):
            return {"message": "Pseudo already exists. Choose a different one."}, 400
        elif user_service.find_user({'email': email}):
            return {"message": "Email already exists. Choose a different one."}, 400
        else:
            if data.get('picture') and not is_valid_image_url(data.get('picture')):
                    return {"message": "Image invalid"}, 400
            default_image = 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg'
            # Password encryption before registration
            password = crypt_password(data.get('password'))
            # Set user data
            user_data = {
                "pseudo": data.get('pseudo'),
                "email": data.get('email'),
                "picture": data.get('picture', default_image),
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
