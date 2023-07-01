const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");

mongoose.connection
  .on('error', err => {
    console.error(err);
  })
  .on('open', () => {
    console.log(`Database connected`);
  });

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://mongo:27017/wind");

const app = express();

app.use(cors());

app.use(express.json());
app.use("/wind", require("@routers/update"));
app.use("/wind", require("@routers/fetch"));

app.listen(process.env.PORT);
