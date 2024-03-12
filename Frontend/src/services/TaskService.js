// frontend/src/services/TaskService.js
import axios from "axios";

const BASE_URL = "/api/tasks";

export const getAllTasks = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data; // Assuming the server sends back an array of projects
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    throw error;
  }
};
export const getTasksByProjectId = async (projectId) => {
  try {
    const response = await axios.get(`/api/tasks/projects/${projectId}/tasks`);
    // Check if the response data is not null or undefined and is an array
    if (Array.isArray(response.data)) {
      return response.data; // Return the array of tasks (which may be empty)
    } else {
      console.error("Unexpected response format:", response.data);
      return []; // Return an empty array as a fallback
    }
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    // Decide how you want to handle HTTP errors differently, if at all
    // For example, you could return an empty array as a fallback
    // so the calling code can always expect an array, simplifying further processing.
    return []; // Return an empty array to indicate no tasks or an error occurred
  }
};


export const getTasksByProjectIdAndStatus = async (projectId, status) => {
  try {
    const response = await axios.get(`/api/projects/${projectId}/tasks/status/${status}`);
    // Check if the response data is not null or undefined and is an array
    if (Array.isArray(response.data)) {
      return response.data; // Return the array of tasks (which may be filtered by status)
    } else {
      console.error("Unexpected response format:", response.data);
      return []; // Return an empty array as a fallback
    }
  } catch (error) {
    console.error(`Failed to fetch tasks with status ${status}:`, error);
    // You could handle HTTP errors differently here if needed
    // For simplicity, return an empty array to indicate no tasks or an error occurred
    return [];
  }
};

// Add this function in your task service file (assuming it's located in ./services/TaskService.js)

export const getTasksReportByProjectId = async (projectId) => {
  try {
    const response = await axios.get(`/api/tasks/projects/${projectId}/tasks/report`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch tasks report:', error);
    throw error;
  }
};



export const getTaskByID = async (projectId, taskId) => {
  try {
    // Corrected to include the URL path for fetching tasks by project ID
    const response = await axios.get(`/api/tasks/projects/${projectId}/tasks/${taskId}`);
    return response.data; // Assuming the server sends back an array of tasks
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    throw error;
  }
};
export const createTask = async (taskData) => {
  try {
    const response = await axios.post(BASE_URL, taskData);
    return response.data;
  } catch (error) {
    console.error("Error creating new task:", error);
    throw error;
  }
};

export const updateTask = async (projectId, id, taskData) => {
  try {
    // Update the request URL to match the mounted route
    const response = await axios.put(`/api/tasks/projects/${projectId}/tasks/${id}`, taskData);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};


export const deleteTask = async (taskId) => {
  try {
    await axios.delete(`/api/tasks/${taskId}`);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

export const deleteProject = async (projectId) => {
  try {
    await axios.delete(`/api/projects/${projectId}`);
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error; // Optionally re-throw to handle it in the component
  }
};

export const fetchTaskDatesByProjectId = async (projectId) => {
  try {
    const response = await fetch(`/api/tasks/projects/${projectId}/tasks/dates`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const tasksWithDates = await response.json();
    return tasksWithDates;
  } catch (error) {
    console.error('Failed to load tasks:', error);
    return [];
  }
};

