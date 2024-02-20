import React, {useState, useEffect, useCallback} from 'react';
import TaskCreat from './TaskCreat';
import { useParams } from 'react-router-dom';
import TaskList from "./TaskList";
import * as taskService from "../services/TaskService";
import TaskEdit from "./TaskEdit";
import './css/TaskBoard.css';

const TaskBoard = () => {
    const { projectId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isEditComponentOpen, setIsEditComponentOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);

    const refreshTasks = useCallback(async () => {
        const updatedTasks = await taskService.getTasksByProjectId(projectId);
        setTasks(updatedTasks);
    }, [projectId]);

    useEffect(() => {
        refreshTasks();
    }, [refreshTasks]);


    const handleAddTaskClick = () => {
        setIsTaskModalOpen(true);
    };

    const handleDeleteProject = async (taskID) => {
        try {
            await taskService.deleteTask(taskID);
            await refreshTasks();
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    };

    const handleOpenEditComponent = (task) => {
        setEditingProject(task);
        setIsEditComponentOpen(true);
    };

    return (
        <div className="TaskBoard">
            <h2 className="TaskBoardTitle">Task Board</h2>
            <button className="AddTaskButton" onClick={handleAddTaskClick}>Add New Task</button>
            <TaskList tasks={tasks} onDelete={handleDeleteProject} onEdit={handleOpenEditComponent}></TaskList>
            {isTaskModalOpen && (
                <TaskCreat
                    isOpen={isTaskModalOpen}
                    onClose={() => setIsTaskModalOpen(false)}
                    projectId={projectId}
                    fetchTasks={refreshTasks}
                />
            )}
            {isEditComponentOpen && (
                <TaskEdit
                    isOpen={isEditComponentOpen}
                    projectId={projectId}
                    onClose={() => setIsEditComponentOpen(false)}
                    fetchTasks={refreshTasks}
                    TaskID={editingProject ? editingProject.id : null}
                />
            )}
        </div>
    );
};

export default TaskBoard;