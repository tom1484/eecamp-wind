import requests
import json
from datetime import datetime
from time import time
import json

# BASE_URL = 'http://140.112.174.222:9487'
BASE_URL = 'http://localhost:9487'
API_AUTH = '/wind/fetch'

session = requests.Session()

req = session.post(
    BASE_URL + API_AUTH, json={},
    allow_redirects=True
)

file_name = input("Backup file name: ") + ".json"
json.dump(req.json(), open(file_name, "w"), indent=4)

