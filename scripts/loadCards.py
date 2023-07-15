import requests
import sys

BASE_URL = 'http://localhost'
# BASE_URL = 'https://eecamp-wind.vercel.app'
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
