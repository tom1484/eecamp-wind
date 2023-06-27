const express = require("express");

const Team = require("@models/team");
const Card = require("@models/card");

const router = express.Router();
router.post("/fetch", async (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");

	const teams = await Team.find({});
	res.status(200).json({ result: teams });
});


module.exports = router;

