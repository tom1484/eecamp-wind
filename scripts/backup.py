"""
This is for backing up all records
"""

import requests
import json
from datetime import datetime
from time import time
import json

BASE_URL = 'http://localhost:8085'
API_AUTH = '/api/teams/fetch'

session = requests.Session()

req = session.get(
    BASE_URL + API_AUTH,
    allow_redirects=True
)
req = req.json()

file_name = input("Backup file name: ") + ".json"
with open(file_name, "w") as file:
    json.dump(req, file, indent=4)

