import requests
import sys

# BASE_URL = 'http://localhost:8085'
BASE_URL = 'https://eecamp-wind.ntuee.org'
API_AUTH = '/api/cards/load'

session = requests.Session()
cards = open(f"{sys.argv[1]}").read().split()
data = []

for i, card in enumerate(cards):

    fileds = card.split(",")
    data.append({
        "RFID": fileds[0],
        "score": int(fileds[1]),
    })

    print(fileds[0])

req = session.post(
    BASE_URL + API_AUTH, json=data,
    allow_redirects=True
)

print(req.json())
