const path = require("path");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
const { timingSafeEqual } = require("crypto");
const Schema = mongoose.Schema ({
    text: String,
    checked: Boolean
});
let todoSchema = mongoose.model('tasks', Schema);


router.get('/api/tasks', async function(req, res) {
    const tasks = await todoSchema.find();
    res.status(200).json(tasks);
});

router.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../front', "index.html"));
 });

router.post('/api/task', (req, res) => {
    const newTask = todoSchema({
        text: req.body.text,
        checked: req.body.checked
    });
    newTask.save();
    res.status(200).json({});

});

router.put('/api/task/:id', async (req, res) => {
    const edited = await todoSchema.findOneAndUpdate({_id: req.params.id}, { $set: {
        text: req.body.text,
        checked: req.body.checked
    }});
    res.status(200).json(edited);
})

router.delete('/api/task/:id', async (req,res) => {
    const deleted = await todoSchema.deleteOne({_id: req.params.id});
    res.status(200).json(deleted);
})
module.exports = router;
