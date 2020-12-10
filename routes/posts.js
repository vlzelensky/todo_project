const path = require("path");
const express = require("express");
const router = express.Router();
let todoList = [];

router.get('/api/tasks', function(req, res) {
    res.status(200).json(todoList.slice().reverse());
});

router.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../front', "index.html"));
 });

router.post('/api/task', (req, res) => {
    const newTask = req.body;
    todoList.push({...newTask, id: String(Date.now())});
    res.status(201).json({});
});

router.put('/api/task/:id', (req, res) => {
    editingEl = todoList.findIndex(el => req.params.id === el.id);
    todoList[editingEl] = req.body;
    res.status(200).json(todoList[editingEl]);
})

router.delete('/api/task/:id', (req,res) => {
  todoList = todoList.filter(el => req.params.id !== el.id);
  res.status(200).json({});
})
module.exports = router;
