import axios from "axios";
import { lazy } from "react";

const API_URL = "/api/users";

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
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error.response ? error.response.data : error.message);
    throw error;
  }
};

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
};

export const handleUpdate = async (id, userData) => {
  try {
    const response = await axios.put(`/api/users/${id}`, userData);
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

export const getDevelopers = async () => {
  try {
    const response = await axios.get("/api/users/developers");
    console.log("Developers:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting developers:", error);
    throw error;
  }
};

export const getDeveloperStats = async (developerId) => {
  try {
    const response = await axios.get(`/api/users/developers/${developerId}/stats`);
    console.log(`Statistics for developer ${developerId}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error getting statistics for developer ${developerId}:`, error);
    throw error;
  }
};
