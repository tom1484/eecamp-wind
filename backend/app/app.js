const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");

mongoose.connection
	.on('error', err => {
		console.error(err);
	})
	.on('open', err => {
		console.log(`Database connected`);
	});

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://mongo:27017/wind");

const app = express();

// app.use(function (req, res, next) {
// 	res.header('Access-Control-Allow-Origin', `http://${process.env.SERVER_IP}:${process.env.FRONTEND_PORT}`);
// 	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
// 	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
// 	res.header('Access-Control-Allow-Credentials', 'true');
// 	next();
// })

app.use(cors());

app.use(express.json());
app.use("/wind", require("@routers/update"));
app.use("/wind", require("@routers/fetch"));

app.listen(process.env.PORT);

