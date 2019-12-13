# coding=utf-8

import os, json, io
from flask import Flask, jsonify, request
from flask_cors import CORS

from ruamel.yaml import YAML
yaml_parser =  YAML()#typ="safe"
app = Flask(__name__)
CORS(app)

def get_YAML_string(obj):
    strngio = io.StringIO()
    yaml_parser.dump(obj, strngio)
    strngio.seek(0)
    yamlstr = strngio.read()
    strngio.close()
    return yamlstr

@app.route('/questions/<int:number>')
def get_question(number:int):
    # Number is base 1
    jsonpath = os.path.join(os.path.split(os.path.split(__file__)[0])[0], 'static', 'Questions.json')
    with open(jsonpath, "rt") as opf:
        jsonstring = opf.read()
        qdct = json.loads(jsonstring)
        questionobj =  qdct[number - 1]
        for filedct in questionobj["files"]:
            filedct["stage_yaml"] = get_YAML_string(filedct["stage"])
            filedct["answers_yaml"] = get_YAML_string(filedct["answers"])
        questionobj["question_index"] = number - 1
        return jsonify(questionobj)

@app.route('/questions')
def get_questions():
    # fetching from the database
    jsonpath = os.path.join(os.path.split(os.path.split(__file__)[0])[0], 'static', 'Questions.json')
    with open(jsonpath, "rt") as opf:
        jsonstring = opf.read()
        qsdct = json.loads(jsonstring)
        for (iquestion, question) in enumerate(qsdct):
            for filedct in question["files"]:
                filedct["stage_yaml"] = get_YAML_string(filedct["stage"])
                filedct["answers_yaml"] = get_YAML_string(filedct["answers"])
            question["question_index"] = iquestion
            question["of_N_questions"] = len(qsdct)

        return jsonify(qsdct)
