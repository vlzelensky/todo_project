const { path } = require("dotenv/lib/env-options");
const express = require("express");
const router = express.Router();
const todoList = [{
    text : 3122,
    checked : false,
    id : String(Date.now()), 
}];

router.get('/api/tasks', function(req, res) {
    res.status(200).json(todoList);
});

router.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'front', " index.html"));
 });

 router.post('/addtodo', (req, res) => {
    console.log(req.body);
});
 module.exports = router;