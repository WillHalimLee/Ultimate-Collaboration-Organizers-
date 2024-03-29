import React, { useEffect, useState } from "react";
import * as taskService from "../services/TaskService";
import * as userService from "../services/userService";
import "./css/EditTask.css"; // Ensure this is pointing to the correct CSS file

const TaskCreate = ({ isOpen, onClose, projectId, fetchTasks }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Pending",
    dueDate: "",
    projectId: projectId,
    createdBy: JSON.parse(localStorage.getItem("user")), // Assuming the user's ID is stored in localStorage
    assignedTo: [],
  });
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    const fetchDevelopers = async () => {
      const devs = await userService.getDevelopers(); // Implement this in userService
      setDevelopers(devs);
    };
    fetchDevelopers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeveloperSelection = (devId) => {
    setTask((prev) => ({
      ...prev,
      assignedTo: prev.assignedTo.includes(devId) ? prev.assignedTo.filter((id) => id !== devId) : [...prev.assignedTo, devId],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await taskService.createTask(task);
      fetchTasks();
      onClose();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`project-modal ${isOpen ? "open" : ""}`} style={{ display: isOpen ? "flex" : "none" }}>
      <div className="modal-content">
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title</label>
            <input id="title" name="title" type="text" placeholder="Enter a name for your Task" onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" placeholder="Enter a Task description" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="status">Status</label>
            <select id="status" name="status" onChange={handleChange}>
              <option value="Pending">Pending</option>
              <option value="InProgress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label htmlFor="dueDate">Due Date</label>
            <input id="dueDate" name="dueDate" type="date" onChange={handleChange} />
          </div>
          <div className="ad">
            <label>Assign Developers</label>
            {developers.map((dev) => (
              <label key={dev._id}>
                <input type="checkbox" onChange={() => handleDeveloperSelection(dev._id)} checked={task.assignedTo.includes(dev._id)} />
                {dev.Fname + " " + dev.Lname}
              </label>
            ))}
          </div>
          <div className="button-group">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="create-button">
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskCreate;
