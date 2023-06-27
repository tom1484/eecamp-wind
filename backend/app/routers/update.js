const express = require("express");

const Team = require("@models/team");
const Card = require("@models/card");

function timeShift(timestamp) {
	let date = new Date(timestamp);
	date.setTime(date.getTime() + 8 * 60 * 60 * 1000);
	timestamp = date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
	return timestamp;
}

const router = express.Router()
router.post("/update", async (req, res) => {

	console.log("requested");
	try {
		console.log(req.body);
		const ID = req.body.ID;
		const RFID = req.body.RFID;
		const machineID = req.body.machineID;
		const command = req.body.command;

		if (command === "alive") {
			res.status(200).json({ result: "Received alive" });
			console.log(String(ID) + "-" + String(machineID) + "is alive");
		}
		else if (command === "update") {

			let card = await Card.findOne({ RFID: RFID });

			const teams = await Team.where("ID").equals(ID);
			const team = teams.length >= 0 ? teams[0] : null;

			if (card) {
				for (const record of team.history) {
					if (record.RFID === RFID) {
						console.log("Card already detected");
						res.status(201).json({ result: "Card already detected" });
						return;
					}
				}
				team.history.push({
					RFID: card.RFID,
					score: card.score,
					timestamp: timeShift(new Date()),
				});
				team.score += card.score;

				team.save().then((team) => {
					console.log("Get points");
					res.status(200).json({ result: "Get points" });
				});
			}
			else {
				card = await Card.findOne({ RFID: "penalty" });

				team.history.push({
					RFID: card.RFID,
					score: card.score,
					timestamp: timeShift(new Date()),
				})
				team.score += card.score;

				team.save().then((team) => {
					console.log("Get penalty");
					res.status(202).json({ result: "Card Not Found" });
				});
			}
		}
	}
	catch (e) {
		console.log("Unexpected error");
		res.status(203).json({ result: "Unexpected error" });
	}

});


module.exports = router;

