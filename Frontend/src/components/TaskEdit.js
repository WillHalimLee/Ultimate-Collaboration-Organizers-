import React, { useEffect, useState } from "react";
import * as TaskService from "../services/TaskService";
import * as UserService from "../services/userService";
import "./css/EditTask.css";
const TaskEdit = ({ isOpen, onClose, projectId, fetchTasks, TaskID }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "",
    dueDate: "",
    projectId: "",
    createdBy: "",
    assignedTo: [],
  });
  const [allDevelopers, setAllDevelopers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDevelopers = async () => {
      setIsLoading(true);
      try {
        const devs = await UserService.getDevelopers();
        setAllDevelopers(devs);
      } catch (error) {
        console.error("Failed to fetch developers", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchTask = async () => {
      setIsLoading(true);
      console.log("TaskID", TaskID);
        console.log("projectId", projectId);
      try {
        console.log("TaskID", TaskID);
        console.log("projectId", projectId);
        const response = await TaskService.getTaskByID(projectId, TaskID);
        setTask({
          ...response,
        });
      } catch (error) {
        console.error("Failed to fetch task data.", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (TaskID) {
      console.log("TaskID", TaskID);
      fetchTask();
      fetchDevelopers();
    }
  }, [TaskID,projectId]);

  const handleDeveloperSelection = (devId) => {
    setTask((prev) => ({
      ...prev,
      assignedTo: prev.assignedTo.includes(devId) ? prev.assignedTo.filter((id) => id !== devId) : [...prev.assignedTo, devId],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!TaskID) {
      console.error("Task ID is undefined");
      return;
    }
    try {
      await TaskService.updateTask(projectId, TaskID, task);
      fetchTasks();
      onClose();
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container">
      <div>
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="title" htmlFor="title">
              Title
            </label>
            <input id="title" type="text" name="title" value={task.title} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" value={task.description} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="status">Status</label>
            <select id="status" name="status" value={task.status} onChange={handleChange}>
              <option value="Pending">Pending</option>
              <option value="InProgress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Emergency">Emergency</option>
            </select>
          </div>
          <div>
            <label htmlFor="dueDate">Due Date</label>
            <input id="dueDate" name="dueDate" type="date" value={task.dueDate} onChange={handleChange} />
          </div>
          <div>
            <label>Assigned Developers</label>
            {allDevelopers.map((dev) => (
              <label key={dev._id}>
                <input type="checkbox" checked={task.assignedTo.includes(dev._id)} onChange={() => handleDeveloperSelection(dev._id)} />
                {dev.Fname} {dev.Lname}
              </label>
            ))}
          </div>
          <button type="submit">Save Task</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskEdit;
