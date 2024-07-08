"""
Example CSV file content:
team0
team1
teamHeHe
team name
"""

import requests
import sys

# BASE_URL = 'http://localhost:8085'
BASE_URL = 'https://eecamp-wind.ntuee.org'
API_AUTH = '/api/teams/load'

session = requests.Session()
teams = open(f"{sys.argv[1]}").read().split("\n")
data = []

for i, team in enumerate(teams):

    if team == "":
        continue

    data.append({
        "id": i,
        "name": team,
        "score": 0,
        # "history": [{"RFID": "73bc180a", "timestamp": "123"}],
        "history": [],
    })

req = session.post(
    BASE_URL + API_AUTH, json=data,
    allow_redirects=True
)

print(req.json())
