import React from "react";
import { Link } from "react-router-dom";
import "./css/TaskList.css";

const TaskList = ({ tasks, onDelete, onEdit }) => {
  const formatDate = (date) => date ? new Date(date).toLocaleDateString('en-US') : 'No Date';

  // Check if tasks is not an array or it's empty and render an appropriate message or component
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return <div className="no-tasks">No tasks available</div>;
  }

  return (
      <div className="project-list">
        {tasks.map((task) => (
            <Link to={`/weekly-view/${task._id}`} key={task._id} className="task-link">
              <div className="project-item">
                <h3>{task.title}</h3>
                <p>Description: {task.description || 'No description'}</p>
                <p>Status: {task.status}</p>
                <p>Due Date: {formatDate(task.dueDate)}</p>
                {task.createdByDetails && (
                    <p>Created By: {`${task.createdByDetails.Fname} ${task.createdByDetails.Lname}`}</p>
                )}

                <p>Assigned To:</p>
                <ul>
                  {task.assignedToDetails && task.assignedToDetails.map((user) => (
                      user && <li key={user._id}>{user.Fname + ' ' + user.Lname}</li>
                  ))}
                </ul>

                <button
                    onClick={(e) => {
                      e.preventDefault();
                      onDelete(task._id);
                    }}
                >
                  Delete Task
                </button>
                <button
                    onClick={(e) => {
                      e.preventDefault();
                      onEdit(task);
                    }}
                >
                  Edit
                </button>
              </div>
            </Link>
        ))}
      </div>
  );
};

export default TaskList;
