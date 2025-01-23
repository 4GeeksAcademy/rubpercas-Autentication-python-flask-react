"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)
bcrypt = Bcrypt()

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()
    
    if user is None:
        return jsonify({"msg": "No se encuentra el email"}), 404  
    
    if email is None or user.password != password:
        return jsonify({"msg": "Correo o contraseña incorrectos"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200



@api.route('/signup', methods=['POST'])
def signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email or not password:
        return jsonify({"msg": "Faltan datos obligatorios"}), 400

    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"msg": "Email ya registrado"}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, password=hashed_password, is_active=True)

    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        return jsonify({"msg": "Error en el registro", "error": str(e)}), 500
    
    access_token = create_access_token(identity=new_user.id)
    return jsonify({"msg": "Usuario creado exitosamente", "access_token": access_token}), 201

@api.route("/private", methods=["GET"])
@jwt_required()  
def private_route():
    private_user = get_jwt_identity()
    
    response_body = {
        "msg": f"Bienvenido a la ruta solo para usuarios registrados, {private_user}."
    }

    return jsonify(response_body), 200