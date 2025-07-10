require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const TodoModel = require('./models/Todo');
const cors = require('cors');

// Enable Cross-Origin Resource Sharing (CORS) to allow frontend requests from different origin
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());



// Connect to MongoDB database named 'mytodos'
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));


// Route to get all todo tasks from database
app.get("/get", (req, res) => {
  TodoModel.find()
    .then(result => res.json(result)) // Send tasks as JSON response
    .catch(err => res.status(500).json({ error: err }));
});

// Route to add a new todo task
app.post("/add", (req, res) => {
  const { task } = req.body; // Get task from request body
  TodoModel.create({ task })
    .then(result => res.json(result)) // Send created task as JSON response
    .catch(err => res.status(500).json({ error: err }));
});

// Route to delete a todo task by its ID
app.delete("/delete/:taskId", (req, res) => {
  const { taskId } = req.params; // Get taskId from URL parameters
  TodoModel.findByIdAndDelete(taskId)
    .then(result => res.json(result)) // Send deleted task info as JSON response
    .catch(err => res.status(500).json({ error: "Delete failed", err }));
});

// Route to update a task name by its ID
app.put("/update/:taskId", (req, res) => {
  const { taskId } = req.params;
  const { task } = req.body; // Get updated task name from request body
  TodoModel.findByIdAndUpdate(taskId, { task: task })
    .then(result => res.json(result)) // Send update result as JSON response
    .catch(err => res.status(500).json({ error: "Update failed", err }));
});

// Route to toggle the 'done' status of a task by its ID
app.put("/toggle/:taskId", (req, res) => {
  const { taskId } = req.params;
  const { done } = req.body; // Get new done status (true/false) from request body
  TodoModel.findByIdAndUpdate(taskId, { done: done })
    .then(result => res.json(result)) // Send updated task as JSON response
    .catch(err => res.status(500).json({ error: "Toggle failed", err }));
});

// Start the server on port 3000 and log a message
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
