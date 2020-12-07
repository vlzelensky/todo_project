var express = require('express');
var app = express();

console.log(__dirname);

app.use('/', express.static(__dirname + "/front"));

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("its working", host, port)
})
