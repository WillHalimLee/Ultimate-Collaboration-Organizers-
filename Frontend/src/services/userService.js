import axios from 'axios';

const API_URL = '/api/users'; // Base URL for user-related endpoints
export const register = async (taskData) => {
    try {
        const response = await axios.post('/api/users/register', taskData);
        console.log('User registered:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating new task:', error);
        throw error;
    }
};


export const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        console.log('User logged in:', response.data.token);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data)); // Store user data in localStorage
        }
        return response.data; // Optionally return data for further processing
    } catch (error) {
        console.error('Error logging in:', error.response ? error.response.data : error.message);
        throw error; // Propagate the error to be handled by the caller
    }
}

