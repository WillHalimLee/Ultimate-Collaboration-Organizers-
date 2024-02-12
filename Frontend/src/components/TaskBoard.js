import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import TaskFormModal from './TaskFormModal';
import { useParams } from 'react-router-dom';

const TaskBoard = () => {
    const { projectId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

    // Memoize fetchTasks to prevent useEffect from running endlessly
    const fetchTasks = useCallback(async () => {
        const response = await axios.get(`/api/projects/${projectId}/tasks`);
        setTasks(response.data);
    }, [projectId]); // projectId is a dependency of useCallback

    useEffect(() => {
        fetchTasks();
    }, [projectId, fetchTasks]); // Now fetchTasks won't cause an infinite loop

    const handleAddTaskClick = () => {
        setIsTaskModalOpen(true);
    };

    return (
        <div>
            <h2>Task Board</h2>
            <button onClick={handleAddTaskClick}>Add New Task</button>
            {/* Render existing tasks here */}

            {isTaskModalOpen && (
                <TaskFormModal
                    isOpen={isTaskModalOpen}
                    onClose={() => setIsTaskModalOpen(false)}
                    projectId={projectId}
                    refreshTasks={fetchTasks} // This now correctly references the memoized version
                />
            )}
        </div>
    );
};

export default TaskBoard;
