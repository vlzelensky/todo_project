const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

const postRoute = require("./routes/posts");
app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, 'front')));

app.use("/", postRoute);

mongoose.connect(
   process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
   console.log("connected to database")
});

app.listen(8080);
