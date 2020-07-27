#!venv/bin/python
from flask import Flask
from flask_restful import Api
import services

app = Flask(__name__)
api = Api(app)

api.add_resource(services.Products, '/api/products/recommended')


@app.route('/')
def index() -> str:
    return "Hola mundo!"


if __name__ == '__main__':
    app.run(debug=True)
