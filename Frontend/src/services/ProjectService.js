// frontend/src/services/ProjectService.js
import axios from 'axios';

const BASE_URL = '/api/projects';

export const getAllProjects = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data; // Assuming the server sends back an array of projects
    } catch (error) {
        console.error('Failed to fetch projects:', error);
        throw error;
    }
};

export const createProject = async (projectData) => {
    try {
        const response = await axios.post('/api/projects', projectData);
        return response.data;
    } catch (error) {
        console.error('Error creating new project:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
};

export const searchProjects = async (searchTerm) => {
    try {
        const response = await axios.get(`/api/projects/search?searchTerm=${encodeURIComponent(searchTerm)}`);
        return response.data;
    } catch (error) {
        console.error('Error searching projects:', error);
        throw error;
    }
};

export const deleteProject = async (projectId) => {
    try {
        await axios.delete(`/api/projects/${projectId}`);
    } catch (error) {
        console.error('Error deleting project:', error);
        throw error; // Optionally re-throw to handle it in the component
    }
};

export const updateProject = async (project) => {
    try {
        const response = await axios.put(`/api/projects/${project.id}`, project);
        return response.data;
    } catch (error) {
        console.error('Error updating project:', error);
        throw error;
    }
};



