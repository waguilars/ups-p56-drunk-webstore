#!venv/bin/python
from flask import Flask, Response, jsonify
from flask_pymongo import PyMongo
from bson import json_util
from bson.objectid import ObjectId
from sklearn.metrics.pairwise import pairwise_distances, cosine_distances
import numpy as np
from sklearn.decomposition import TruncatedSVD

from decouple import config as config_decouple
from config import config

import pandas as pd
from sklearn.metrics import pairwise_distances


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
    # # print(id)
    prods = mongo.db.productos.find()
    prods = [str(prod['_id']) for prod in prods]

    # users = mongo.db.usuarios.find()
    # users = [str(user['_id']) for user in users]

    ordens = mongo.db.ordens.find()
    orden = []
    for order in ordens:
        for cart, cart_value in order.get('cart').items():
            for products in cart_value:
                prod = []
                for product, product_value in products.items():
                    prod.append(product_value)
                # print(prod)
                orden.append([str(order['user']), str(prod[0]), prod[4]])

                # print("------------------------")
            break

    data = pd.DataFrame(orden)
    data.columns = ['user', 'product', 'quantity']
    print(data)
    print(data.shape)

    scaled = data.copy()
    q = scaled['quantity']
    q = (q-q.min()) / (q.max()-q.min())
    scaled['quantity'] = q

    scaled.to_csv('./scaled.csv',index=False)
    data.to_csv('./data.csv',index=False)
    
    return Response(['prods'], mimetype='application/json')


@app.errorhandler(404)
def not_found(error=None):
    message = {
        'message': 'Resource Not Found ',
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
