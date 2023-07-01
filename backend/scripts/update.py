import requests
import json
from datetime import datetime
from time import time

BASE_URL = 'http://localhost:8085'
API_AUTH = '/update'

session = requests.Session()

for ID in range(5):

    # f = open(f"records/{ID}.txt", "r")
    # print(f"ID: {ID}\n")

    # RFIDs = f.read().split("\n")
    RFIDs = ["f323b309", "f323b309"]

    for RFID in RFIDs:
        if RFID == "end":
            break
        
        _data = {
            "ID": ID, 
            "RFID": RFID,
            "command": "update"
        }

        req = session.post(
            BASE_URL + API_AUTH, json=_data,
            allow_redirects=True
        )

        print(f"{RFID}: ")
        print(req.json())

