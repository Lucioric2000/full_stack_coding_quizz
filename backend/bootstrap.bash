#!/usr/bin/env bash
export FLASK_APP=./src/main.py
#source $(pipenv --venv)/bin/activate
conda activate coding_quiz_Lucio
export FLASK_ENVIRONMENT=development
export FLASK_DEBUG=1
flask run -h 0.0.0.0