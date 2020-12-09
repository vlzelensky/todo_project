const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");

const postRoute = require("./routes/posts");

app.use("/", postRoute);

app.post('/addtodo', function(req, res) {
   res.send("your todo list will be here soon");
});

app.put('/edittodo', function(){});

app.delete('/deletetodo', function(){});

mongoose.connect(
   process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
   console.log("connected to database")
});

app.listen(8080);
