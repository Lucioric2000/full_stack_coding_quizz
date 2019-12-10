#!/usr/bin/env bash
#export FLASK_APP=./src/main.py
#source $(pipenv --venv)/bin/activate
conda activate Mumshad_Mannambeth
export FLASK_ENVIRONMENT=development
flask run -h 0.0.0.0