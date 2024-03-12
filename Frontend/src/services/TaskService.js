import axios from "axios";

const BASE_URL = "/api/tasks";

export const getAllTasks = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    throw error;
  }
};

export const getTasksByProjectId = async (projectId) => {
  try {
    const response = await axios.get(`/api/tasks/projects/${projectId}/tasks`);
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error("Unexpected response format:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return [];
  }
};

export const getTasksByProjectIdAndStatus = async (projectId, status) => {
  try {
    const response = await axios.get(`/api/projects/${projectId}/tasks/status/${status}`);
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error("Unexpected response format:", response.data);
      return [];
    }
  } catch (error) {
    console.error(`Failed to fetch tasks with status ${status}:`, error);
    return [];
  }
};

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
    const response = await axios.get(`/api/tasks/projects/${projectId}/tasks/${taskId}`);
    return response.data;
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
    throw error;
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
