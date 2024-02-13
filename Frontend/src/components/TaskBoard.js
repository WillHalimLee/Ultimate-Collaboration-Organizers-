import React, { useState, useEffect } from 'react';

import TaskFormModal from './TaskFormModal';
import { useParams } from 'react-router-dom';
import TaskList from "./TaskList";
import * as taskService from "../services/TaskService";



const TaskBoard = () => {
    const { projectId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);


    useEffect(() => {
        refreshTasks();
    }, [projectId]); // Now fetchTasks won't cause an infinite loop
    const refreshTasks = async () => {
        const updatedTasks = await taskService.getTasksByProjectId(projectId);
        setTasks(updatedTasks); // Assuming you have a state [tasks, setTasks] in TaskBoard.js
    };
    const handleAddTaskClick = () => {
        setIsTaskModalOpen(true);
    };
    const handleDeleteProject = async (taskID) => {
        try {
            await taskService.deleteTask(taskID);
            await refreshTasks(); // Refresh the projects list after deletion
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    };

    return (
        <div>
            <h2>Task Board</h2>
            <button onClick={handleAddTaskClick}>Add New Task</button>
            {/* Render existing tasks here */}
            <TaskList tasks={tasks} onDelete={handleDeleteProject}></TaskList>
            {isTaskModalOpen && (
                <TaskFormModal
                    isOpen={isTaskModalOpen}
                    onClose={() => setIsTaskModalOpen(false)}
                    projectId={projectId}
                    fetchTasks={refreshTasks} // Pass the memoized function to the modal
                />
            )}
        </div>
    );
};

export default TaskBoard;
