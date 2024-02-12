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
        const response = await axios.post(BASE_URL, projectData);
        return response.data;
    } catch (error) {
        console.error('Failed to create project:', error);
        throw error;
    }
};

