require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const TodoModel = require('./models/Todo');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

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

// app.put("/toggle/:taskId", async (req, res) => {
//   try {
//     const { taskId } = req.params;
//     const { done } = req.body;

//     if (done === undefined) {
//       return res.status(400).json({ error: "'done' field is required" });
//     }

//     const updatedTask = await TodoModel.findByIdAndUpdate(taskId, { done }, { new: true });

//     if (!updatedTask) {
//       return res.status(404).json({ error: "Task not found" });
//     }

//     res.status(200).json(updatedTask);
//   } catch (err) {
//     console.error("Toggle failed:", err);
//     res.status(500).json({ error: "Toggle failed", err });
//   }
// });

app.put("/mark-done/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const { done } = req.body;

    if (typeof done !== "boolean") {
      return res.status(400).json({ error: "'done' must be true or false" });
    }

    const updatedTask = await TodoModel.findByIdAndUpdate(
      taskId,
      { done },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error toggling done status:", error);
    res.status(500).json({ error: "Server error" });
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
