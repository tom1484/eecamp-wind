const fs = require("fs")

const mongoose = require("mongoose")

const Team = require("@models/team")

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://mongo:27017/wind")


Team.deleteMany({}).then((err) => {
	const data = fs.readFileSync("data/teams.txt", "utf8")
	const lines = data.split("\n")

	var total = 0
	var saved = 0
	for (let i = 0; i < lines.length; i++) {
		if (lines[i].length == 0) {
			continue
		}
		total++
		const team = new Team({
			ID: i,
			name: lines[i],
			history: [],
			score: 0
		})
		team.save().then((team) => {
			if (++saved == total) {
				process.exit()
			}
		})
	}

})
