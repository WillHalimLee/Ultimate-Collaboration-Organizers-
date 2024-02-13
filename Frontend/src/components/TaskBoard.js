import React, { useState, useEffect } from 'react';

import TaskFormModal from './TaskFormModal';
import { useParams } from 'react-router-dom';
import TaskList from "./TaskList";
import * as taskService from "../services/TaskService";
import EditProjectComponent from "./EditProjectComponent";
import EditTasks from "./EditTasks";



const TaskBoard = () => {
    const { projectId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isEditComponentOpen, setIsEditComponentOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);


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
    const handleOpenEditComponent = (task) => {
        setEditingProject(task);
        setIsEditComponentOpen(true);
    };

    return (
        <div>
            <h2>Task Board</h2>
            <button onClick={handleAddTaskClick}>Add New Task</button>
            {/* Render existing tasks here */}
            <TaskList tasks={tasks} onDelete={handleDeleteProject} onEdit={handleOpenEditComponent}></TaskList>
            {isTaskModalOpen && (
                <TaskFormModal
                    isOpen={isTaskModalOpen}
                    onClose={() => setIsTaskModalOpen(false)}
                    projectId={projectId}
                    fetchTasks={refreshTasks} // Pass the memoized function to the modal

                />
            )}
            {isEditComponentOpen && (
                <EditTasks
                    isOpen={isEditComponentOpen}
                    projectId={projectId}
                    onClose={() => setIsEditComponentOpen(false)}
                    fetchTasks={refreshTasks} // Pass the memoized function to the modal
                    TaskID = {editingProject ? editingProject.id : null}
                />
            )}
        </div>
    );
};

export default TaskBoard;
