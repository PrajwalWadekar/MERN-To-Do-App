require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const TodoModel = require('./models/Todo');
const cors = require('cors');

app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));


app.get("/get", (req, res) => {
  TodoModel.find()
    .then(result => res.json(result)) 
    .catch(err => res.status(500).json({ error: err }));
});


app.post("/add", (req, res) => {
  const { task } = req.body; 
  TodoModel.create({ task })
    .then(result => res.json(result)) 
    .catch(err => res.status(500).json({ error: err }));
});


app.delete("/delete/:taskId", (req, res) => {
  const { taskId } = req.params; 
  TodoModel.findByIdAndDelete(taskId)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: "Delete failed", err }));
});


app.put("/update/:taskId", (req, res) => {
  const { taskId } = req.params;
  const { task } = req.body; 
  TodoModel.findByIdAndUpdate(taskId, { task: task })
    .then(result => res.json(result)) 
    .catch(err => res.status(500).json({ error: "Update failed", err }));
});


app.put("/toggle/:taskId", (req, res) => {
  const { taskId } = req.params;
  const { done } = req.body; 
  TodoModel.findByIdAndUpdate(taskId, { done: done })
    .then(result => res.json(result)) 
    .catch(err => res.status(500).json({ error: "Toggle failed", err }));
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
