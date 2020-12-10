const express = require("express");

const app = express();

app.get("/", function(req,res) {
  res.send("main page")
});

app.post("/gettodo", function(req,res) {
  res.send("main page")
});

app.put("/edittodo", function(req,res) {
  res.send("main page")
});

app.delete("/deletetodo", function(req,res) {
  res.send("main page")
});


app.listen(8080);
console.log("you're in the grid");
