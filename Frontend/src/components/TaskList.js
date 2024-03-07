import React from "react";
import { Link } from "react-router-dom";
import "./css/TaskList.css";

const TaskList = ({ tasks, onDelete, onEdit, userRole }) => {
  const formatDate = (date) => date ? new Date(date).toLocaleDateString('en-US') : 'No Date';

  return (
      <div className="project-list">
        {tasks.map((task) => (
            <div key={task._id} className="project-item" >
              <h3>{task.title}</h3>
              <p>Description: {task.description || 'No description'}</p>
              <p>Status: {task.status}</p>
              <p>Due Date: {formatDate(task.dueDate)}</p>
              {task.createdByDetails && <p>Created By: {task.createdByDetails ? `${task.createdByDetails.Fname} ${task.createdByDetails.Lname}` : 'Unknown'}
                </p>}

              <p>Assigned To:</p>
              <ul>
                {task.assignedToDetails.map((user) => (
                    user && <li key={user._id}>{user.Fname + ' ' + user.Lname}</li>
                ))}
              </ul>



                    <button
                        onClick={(e) => {
                          e.preventDefault(); // Prevent any parent action, if wrapped inside a link or similar
                          onDelete(task._id);
                        }}
                    >
                      Delete Task
                    </button>
                    <button
                        onClick={(e) => {
                          e.preventDefault(); // Prevent any parent action
                          onEdit(task._id);
                        }}
                    >
                      Edit
                    </button>


            </div>
        ))}
      </div>
  );
};

export default TaskList;
