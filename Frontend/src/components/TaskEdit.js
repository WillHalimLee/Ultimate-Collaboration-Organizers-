import React, { useEffect, useState } from "react";
import * as TasksService from "../services/TaskService";

const TaskEdit = ({ isOpen, onClose, projectId, fetchTasks, TaskID }) => {
  const [Tasks, setTasks] = useState({ title: "", description: "", status: "", dueDate: "", projectId: projectId });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      setIsLoading(true);
      try {
        const response = await TasksService.getTaskByID(projectId, TaskID);
        setTasks(response[0]);
      } catch (err) {
        console.log("Failed to fetch task data.");
      } finally {
        setIsLoading(false);
      }
    };

    if (TaskID) {
      fetchTask();
    }
  }, [TaskID, projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTasks((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!projectId) {
      console.error("Project ID is undefined");
      return;
    }

    try {
      await TasksService.updateTask(projectId, TaskID, Tasks);
      fetchTasks();
      onClose();
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="modal-overlay">
      <div className="modal-body">
        <h2>Edit Task</h2> {}
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input id="title" type="text" name="title" value={Tasks.title} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" value={Tasks.description} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="status">Status</label>
            <select id="status" name="status" value={Tasks.status} onChange={handleChange}>
              <option value="Pending">Pending</option>
              <option value="InProgress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label htmlFor="dueDate">Due Date</label>
            <input id="dueDate" name="dueDate" type="date" value={Tasks.dueDate} onChange={handleChange} />
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
