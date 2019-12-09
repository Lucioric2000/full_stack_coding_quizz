from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/slasher/')
def slasher():
    return 'Hello, World!'

@app.route('/error')
def err():
    #return "5/0"
    return 5/0