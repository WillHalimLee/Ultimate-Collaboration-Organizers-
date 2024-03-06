import axios from "axios";
import {lazy} from "react";

const API_URL = "/api/users"; // Base URL for user-related endpoints
export const register = async (taskData) => {
  try {
    const response = await axios.post("/api/users/register", taskData);
    console.log("User registered:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating new task:", error);
    throw error;
  }
};

export const login = async (userData) => {
  try {
    console.log(userData);
    const response = await axios.post("/api/users/login", userData);
    console.log("User logged in:", response.data.token);
    console.log("HELLO ");
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data)); // Store user data in localStorage
    }
    return response.data; // Optionally return data for further processing
  } catch (error) {
    console.error("Error logging in:", error.response ? error.response.data : error.message);
    throw error; // Propagate the error to be handled by the caller
  }
};

//get user by id
export const getUserById = async (id) => {
    console.log("ID:", id);
    try {
        const response = await axios.get(`/api/users/${id}`);
        console.log("User:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error getting user:", error);
        throw error;
    }
}
export const handleUpdate = async (id, userData) => {
  try {
    // Call the update API
    const response = await axios.put(`/api/users/${id}`, userData);

    // Optional: Check if the update was successful
    if (response.status === 200) {
      console.log("User updated successfully:", response.data);
      return response.data;
    } else {
      console.error("Failed to update user:", response.status);
    }
  } catch (error) {
    console.error("Error updating user:", error.response ? error.response.data : error.message);
    throw error;
  }
};
