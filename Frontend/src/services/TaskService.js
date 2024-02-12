// frontend/src/services/TaskService.js
import axios from 'axios';

const BASE_URL = '/api/tasks';

export const getTasksByProjectId = async (projectId) => {
    try {
        const response = await axios.get(`${BASE_URL}/projects/${projectId}`);
        return response.data; // Assuming the server sends back an array of tasks
    } catch (error) {
        console.error('Failed to fetch tasks:', error);
        throw error;
    }
};

export const createTask = async (taskData) => {
    try {
        const response = await axios.post(BASE_URL, taskData);
        return response.data;
    } catch (error) {
        console.error('Error creating new task:', error);
        throw error;
    }
};

export const updateTask = async (id, taskData) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, taskData);
        return response.data;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};

export const deleteTask = async (taskId) => {
    try {
        await axios.delete(`${BASE_URL}/${taskId}`);
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};
