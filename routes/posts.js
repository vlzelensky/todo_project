const express = require("express");

const router = express.Router();
router.get('/', function(req, res) {
    res.send("main page!");
 });

 router.post('/addtodo', (req, res) => {
    console.log(req.body);
});
 module.exports = router;