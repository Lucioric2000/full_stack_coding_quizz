from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, World from flask!'

@app.route('/slasher/')
def slasher():
    return 'Hello, World!'

@app.route('/error')
def err():
    #return "5/0"
    return 5/0