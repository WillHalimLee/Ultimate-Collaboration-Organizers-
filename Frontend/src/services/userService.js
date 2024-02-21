import axios from 'axios';

const API_URL = '/api/users'; // Adjust if your API endpoint differs

export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}

export const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        if (response.data){
            localStorage.setItem('user', JSON.stringify(response.data));
        }
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}