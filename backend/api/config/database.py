# RESOURCES
import os

from dotenv import load_dotenv
from pymongo import MongoClient

# Call environment
load_dotenv()

# Get MongoDB connexion chain
mongo_db_url = os.environ.get("MONGO_DB_CONN_STRING")
# Try to create a MongoDB client and connect to the server
try:
    # Create a MongoClient to connect to the MongoDB server
    client = MongoClient(mongo_db_url)
    # Set database
    db = client["BrainBolt"]

    # Printing a message indicating a successful connection
    print("Connection established")

except Exception as e:
    # Handling exceptions and printing an error message if connection failed
    print(f"Error: {e}")
