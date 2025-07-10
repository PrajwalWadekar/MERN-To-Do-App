import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsCircle, BsCheckCircle } from "react-icons/bs";
import './App.css'; 

const Create = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://mern-to-do-app-9o8s.onrender.com";


  const fetchTasks = () => {
    axios.get(`${API_BASE_URL}/get`)
      .then((res) => setTasks(res.data))
      .catch(err => console.error("Error fetching tasks:", err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = () => {
    if (!task.trim()) return;
    axios.post(`${API_BASE_URL}/add`, { task })
      .then(() => {
        setTask("");
        fetchTasks();
      })
      .catch(err => console.error("Error adding task:", err));
  };

  const handleDelete = (taskId) => {
    axios.delete(`${API_BASE_URL}/delete/${taskId}`)
      .then(fetchTasks)
      .catch(err => console.error("Error deleting task:", err));
  };

  const handleUpdate = (taskId) => {
    const newTask = prompt("Enter updated task:");
    if (!newTask) return;
    axios.put(`${API_BASE_URL}/update/${taskId}`, { task: newTask })
      .then(fetchTasks)
      .catch(err => console.error("Error updating task:", err));
  };

  const toggleDone = (taskId, currentStatus) => {
    axios.put(`${API_BASE_URL}/${taskId}`, { done: !currentStatus })
      .then(fetchTasks)
      .catch(err => console.error("Error toggling task status:", err));
  };

  return (
    <div className="">
      <div className="input-row">
        <input
          type="text"
          name="task"
          value={task}
          placeholder="Enter a task"
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <h3>Your Tasks</h3>
      <ul className="task-list">
        {tasks.length === 0 ? (
          <li>No tasks found</li>
        ) : (
          tasks.map((t) => (
            <li key={t._id} className="fade-in">
              <div className="task-left">
                <span
                  onClick={() => toggleDone(t._id, t.done)}
                  title={t.done ? "Mark as Pending" : "Mark as Done"}
                >
                  {t.done ? <BsCheckCircle color="limegreen" size={20} /> : <BsCircle size={20} />}
                </span>
                <span className={t.done ? "done" : ""}>{t.task}</span>
              </div>
              <div className="button-group">
                <button onClick={() => handleUpdate(t._id)}>Edit</button>
                <button onClick={() => handleDelete(t._id)}>Delete</button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Create;
