import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';


const TaskList = ({tasks, onDelete}) => {
    const { projectId } = useParams();

    return (
        <div>
            <h2>Tasks</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <h3>{task.title}</h3>
                        <p>Status: {task.status}</p>
                        <p>Due Date: {task.dueDate}</p>
                        <p>Description: {task.description}</p>
                        <button onClick={() => onDelete(task.id)}>Delete Task</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
