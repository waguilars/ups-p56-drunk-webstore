#!venv/bin/python
from flask import Flask, Response, jsonify
from flask_pymongo import PyMongo
from bson import json_util
from bson.objectid import ObjectId
from sklearn.metrics.pairwise import pairwise_distances,cosine_distances

from decouple import config as config_decouple
from config import config

import pandas as pd


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
    prods = mongo.db.productos.find()
    prods = [str(prod['_id']) for prod in prods]

    users = mongo.db.usuarios.find()
    users = [str(user['_id']) for user in users]

    mtx = pd.DataFrame(int(0), columns=users, index=prods)
    # print(utility_mtx)
    sales = mongo.db.ordens.find()
    for sale in sales:
        user_id = str(sale['user'])
        data = sale['cart']
        data = data['products']
        for prod in data:
            prod_id = str(prod['_id'])
            quantity = prod['quantity']
            mtx[user_id][prod_id] = mtx[user_id][prod_id] + quantity
    ### MATRIZ SIMILITUD
    ### JACKARD
    jac_sim = 1 - pairwise_distances(mtx.T, metric = "hamming")
    jac_sim = pd.DataFrame(jac_sim, index=users, columns=users)
    ### COSENO
    sim_matrix = 1 - cosine_distances(mtx.T)
    sim_matrix = pd.DataFrame(sim_matrix, index=users, columns=users)
    print(sim_matrix)

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
