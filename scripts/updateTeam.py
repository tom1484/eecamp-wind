"""
This is for API test
"""

import requests

# BASE_URL = 'http://localhost:8085'
BASE_URL = 'https://eecamp-wind.ntuee.org'
API_AUTH = '/api/teams/update'

session = requests.Session()

data = {
    "id": 0,
    # "RFID": "22394b34",
    "RFID": input(),
}

req = session.post(
    BASE_URL + API_AUTH, json=data,
    allow_redirects=True
)

print(req.json())
