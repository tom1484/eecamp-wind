const fs = require("fs")
const mongoose = require("mongoose")

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://mongo:27017/wind")

const Card = require("@models/card")

Card.deleteMany({}).then((err) => {

	const data = fs.readFileSync("data/cards.txt", "utf8");
	const lines = data.split("\n");

	var total = 0
	var saved = 0
	for (const line of lines) {
		const arr = line.split(",")
		if (arr.length != 2) {
			return;
		}

		const RFID = arr[0]
		const score = parseInt(arr[1])

		console.log(`${RFID} ${score}`)

		total++
		const card = new Card({ RFID: RFID, score: score })
		card.save().then((card) => {
			if (++saved == total) {
				process.exit()
			}
		})
	}
})



