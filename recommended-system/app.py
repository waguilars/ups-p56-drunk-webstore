#!venv/bin/python
from flask import Flask, Response, jsonify
from flask_pymongo import PyMongo
from bson import json_util
from bson.objectid import ObjectId


from decouple import config as config_decouple
from config import config


def create_app(enviroment):
    app = Flask(__name__)
    app.config.from_object(enviroment)
    return app


enviroment = config['dev']
if config_decouple('PRODUCTION', default=False):
    enviroment = config['prod']

app = create_app(enviroment)

#############################################
#							MONGO
#############################################
app.config["MONGO_URI"] = enviroment.MONGO_URI

mongo = PyMongo(app)

#############################################
#							APIR ROUTE
#############################################


@app.route('/', methods=['GET'])
def index():
    return Response('Works!!!')


@app.route('/recommended/<id>', methods=['POST'])
def recommended_products(id):
    if not ObjectId.is_valid(id):
        return invalidObjectId()

    id = ObjectId(id)
    # print(id)
    data = ['ricky', 'will', 'gabo']
    return Response(data)


@app.errorhandler(404)
def not_found(error=None):
    message = {
        'message': 'Resource Not Found ' + request.url,
        'status': 404
    }
    response = jsonify(message)
    response.status_code = 404
    return response


def invalidObjectId():
    message = {
        'message': 'ID proporcionado no es valido ',
        'status': 400
    }
    response = jsonify(message)
    response.status_code = 404
    return response


app.run()
