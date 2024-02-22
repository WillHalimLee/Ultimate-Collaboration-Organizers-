import React, { useEffect, useState } from "react";
import "./css/TaskList.css";

import { useParams } from "react-router-dom";

const TaskList = ({ tasks, onDelete, onEdit }) => {
  return (
    <div className="project-list">
      {tasks.map((task) => (
        <div className="project-item" key={task.id}>
          <h3>{task.title}</h3>
          <p>Status: {task.status}</p>
          <p>Due Date: {task.dueDate}</p>
          <p>Description: {task.description}</p>
          <button onClick={() => onDelete(task.id)}>Delete Task</button>
          <button onClick={() => onEdit(task)}>Edit</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
