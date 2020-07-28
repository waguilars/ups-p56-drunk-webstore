#!venv/bin/python
from flask import Flask, Response, jsonify
from flask_pymongo import PyMongo
from bson import json_util
from bson.objectid import ObjectId
from sklearn.metrics.pairwise import pairwise_distances,cosine_distances
import numpy as np
from sklearn.decomposition import TruncatedSVD

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
    # # print(id)
    prods = mongo.db.productos.find()
    prods = [str(prod['_id']) for prod in prods]

    # users = mongo.db.usuarios.find()
    # users = [str(user['_id']) for user in users]

    ordens = mongo.db.ordens.find()
    orden = []
    for order in ordens:
        for cart,cart_value in  order.get('cart').items():
            for products in cart_value:
                prod=[]
                for product,product_value in products.items():
                    prod.append(product_value)
                # print(prod)
                orden.append([str(order['user']),str(prod[0]),prod[4]])

                # print("------------------------")
            break

    mtx3=pd.DataFrame(orden)
    mtx3.columns = ['user','product','quantity']
    print(mtx3)

    # users_ids=[ i[0] for i in orden ]
    # users_ids=list(set(users_ids))
    # mtx2 = pd.DataFrame(int(0), index=users_ids, columns=prods)

    # for i  in orden:
    #     mtx2._set_value(i[0],i[1],(int(i[2]+mtx2._get_value(i[0],i[1]))))
    
    # mtx_sim = pairwise_distances(mtx2,metric='euclidean')
    # print(mtx_sim.shape)
    # # mtx2.loc['5f164c956443183c2ceae540','5f14d5cc86d0bd2a08a3e60d']=1
    # # print(mtx2.loc['5f164c956443183c2ceae540','5f14d5cc86d0bd2a08a3e60d'])


    # mtx = pd.DataFrame(int(0), columns=users, index=prods)
    # # print(utility_mtx)
    # sales = mongo.db.ordens.find()
    # for sale in sales:
    #     user_id = str(sale['user'])
    #     data = sale['cart']
    #     data = data['products']
    #     for prod in data:
    #         prod_id = str(prod['_id'])
    #         quantity = prod['quantity']
    #         mtx[user_id][prod_id] = 1
    


    # jac_sim = 1 - pairwise_distances(mtx.T, metric = "hamming") 
    # jac_sim = pd.DataFrame(jac_sim, index=users, columns=users)
    # user=jac_sim[str(id)]
    # user1=[i for i in user if i!=1]
    # maximo=np.amax(user1)
    # usurio_coincidencia=''
    # for key,i in user.items():
    #     if (i == maximo):
    #         usurio_coincidencia=key
    #         break
    # print(user)
    # print(maximo)
    # products_user1 = mtx[str(id)].to_numpy()
    # print(products_user1)
    # products_user2 = mtx[str(usurio_coincidencia)].to_numpy()
    # print(products_user2)
    # print(usurio_coincidencia)
    # for key, value in products_user1.items():
    #     print(products_user2[key])
    #     print(products_user1[key])
    #     print('\n')
    

    # only2 = products_user2[products_user2.isin(products_user1)==False]
    # print(products_user1)
    
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
