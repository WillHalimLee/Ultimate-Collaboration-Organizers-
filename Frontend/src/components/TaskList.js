import React from "react";
import { Link } from "react-router-dom";
import deleteIcon from "./delete.png";
import editIcon from "./edit.png";
import "./css/TaskList.css";

const TaskList = ({ tasks, onDelete, onEdit }) => {
  const formatDate = (date) => (date ? new Date(date).toLocaleDateString("en-US") : "No Date");

  // Checkd if tasks is not an array or it's empty and render an appropriate message or component
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return <div className="no-tasks">No tasks available</div>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
            <div className="task-item-sticky-note">
            <h3>{task.title}</h3>
            <p>Description: {task.description || "No description"}</p>
            <p>Status: {task.status}</p>
            <p>Due Date: {formatDate(task.dueDate)}</p>
            {task.createdByDetails && (
              <p>Created By: {`${task.createdByDetails.Fname} ${task.createdByDetails.Lname}`}</p>
            )}
            <p>Assigned To:</p>
            <ul>
              {task.assignedToDetails &&
                task.assignedToDetails.map((user) => (
                  user && <li key={user._id}>{user.Fname + " " + user.Lname}</li>
                ))}
            </ul>
            <div className="button-container-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete(task._id);
                }}
              >
                <img src={deleteIcon} alt="Delete" />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log("Edit button clicked" + task._id);
                  onEdit(task._id);
                }}
              >
                <img src={editIcon} alt="Edit" />
              </button>
            </div>
          </div>
      ))}
    </div>
  );
};

export default TaskList;
