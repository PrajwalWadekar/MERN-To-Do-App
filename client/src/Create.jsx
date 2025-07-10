import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BsCircle,
  BsCheckCircle
} from "react-icons/bs";

const Create = () => {
  // State to hold the current task input value
  const [task, setTask] = useState("");

  // State to hold the list of all tasks fetched from backend
  const [tasks, setTasks] = useState([]);

  // Function to fetch all tasks from the backend API
  const fetchTasks = () => {
    axios.get("http://localhost:3000/get")
      .then((res) => setTasks(res.data))
      .catch(err => console.error("Error fetching tasks:", err));
  };

  // Fetch tasks once when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Add a new task by sending it to the backend, then refresh the task list
  const handleAdd = () => {
    if (!task.trim()) return; // Do nothing if input is empty or whitespace only
    axios.post("http://localhost:3000/add", { task })
      .then(() => {
        setTask("");  // Clear input field after adding
        fetchTasks(); // Refresh task list
      })
      .catch(err => console.error("Error adding task:", err));
  };

  // Delete a task by ID, then refresh the task list
  const handleDelete = (taskId) => {
    axios.delete(`http://localhost:3000/delete/${taskId}`)
      .then(fetchTasks)
      .catch(err => console.error("Error deleting task:", err));
  };

  // Update a task's name after prompting user input, then refresh the list
  const handleUpdate = (taskId) => {
    const newTask = prompt("Enter updated task:");
    if (!newTask) return; // If user cancels or submits empty, do nothing
    axios.put(`http://localhost:3000/update/${taskId}`, { task: newTask })
      .then(fetchTasks)
      .catch(err => console.error("Error updating task:", err));
  };

  // Toggle the 'done' status of a task and refresh list afterwards
  const toggleDone = (taskId, currentStatus) => {
    axios.put(`http://localhost:3000/toggle/${taskId}`, { done: !currentStatus })
      .then(fetchTasks)
      .catch(err => console.error("Error toggling task status:", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Input field for entering a new task */}
      <label htmlFor="task">Enter Task: </label>
      <input
        type="text"
        name="task"
        id="task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>

      <h3>Task List</h3>

      {/* Display the list of tasks or a message if no tasks */}
      <ul>
        {tasks.length === 0 ? (
          <li>No tasks found</li>
        ) : (
          tasks.map((t) => (
            <ul key={t._id} style={{ listStyleType: "none", padding: 0, marginBottom: "8px" }}>
              {/* Icon toggles between circle and check circle based on done status */}
              <span
                onClick={() => toggleDone(t._id, t.done)}
                style={{ cursor: "pointer", marginRight: "10px" }}
                title={t.done ? "Mark as Pending" : "Mark as Done"}
              >
                {t.done ? <BsCheckCircle color="green" /> : <BsCircle />}
              </span>

              {/* Task text with line-through if done */}
              <span style={{ textDecoration: t.done ? "line-through" : "none" }}>
                {t.task}
              </span>

              &nbsp;&nbsp;

              {/* Edit and Delete buttons */}
              <button onClick={() => handleUpdate(t._id)}>Edit</button>
              <button onClick={() => handleDelete(t._id)}>Delete</button>
            </ul>
          ))
        )}
      </ul>
    </div>
  );
};

export default Create;
