import requests
import sys

BASE_URL = 'http://localhost'
# BASE_URL = 'https://eecamp-wind.vercel.app'
API_AUTH = '/api/teams/update'

session = requests.Session()

data = {
    "id": 0,
    # "RFID": "73bc180a",
    "RFID": "99ae0db4",
}

req = session.post(
    BASE_URL + API_AUTH, json=data,
    allow_redirects=True
)

print(req.json())
