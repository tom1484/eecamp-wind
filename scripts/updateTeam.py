import requests

BASE_URL = 'http://localhost:8085'
API_AUTH = '/api/teams/update'

session = requests.Session()

data = {
    "id": 0,
    "RFID": "99ae0db4",
}

req = session.post(
    BASE_URL + API_AUTH, json=data,
    allow_redirects=True
)

print(req.json())
