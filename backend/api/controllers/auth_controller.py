# Resources
from flask import Blueprint, jsonify
from flask import request
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from flask import jsonify

from ..services.auth_service import AuthService

auth_api = Blueprint('auth', __name__)
# Call AuthService
auth_service = AuthService


# Auth routes
@auth_api.route('/api/register', methods=['POST'])
def register():
    # Call register service
    _json = request.json
    response, status_code = auth_service.register(_json)
    return jsonify(response), status_code


@auth_api.route('/api/login', methods=['POST'])
def login():
    # Call login service
    _json = request.json
    response, status_code = auth_service.login(_json)
    return jsonify(response), status_code


@auth_api.route('/api/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@auth_api.route('/api/check-credentials', methods=['GET'])
def check_credentials():
    field = request.args.get('field')
    value = request.args.get('value')
    response = auth_service.check_credentials(field, value)
    return jsonify(response)