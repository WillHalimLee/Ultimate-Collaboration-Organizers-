const express = require("express");
const Task = require("../models/Task");
const {sendEmergencyEmail} = require("../services/emailService"); // Adjust the path if necessary
const router = express.Router();

// Create a new task
router.post("/", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();

    if (task.status === 'Emergency') {
      await sendEmergencyEmail(task);
    }

    res.status(201).send(task);
  } catch (error) {
    res.status(500).send({ message: "Error creating task", error: error.message });
  }
});

// Get all tasks for a specific project
router.get("/projects/:projectId/tasks", async (req, res) => {
  console.log(req.params.projectId);
  try {
    const tasks = await Task.find({ projectId: req.params.projectId }).exec();
    if (tasks.length > 0) {
      res.json(tasks);
    } else {
      res.status(404).json({ message: "No tasks found for the given project." });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Endpoint to fetch tasks by project ID and status using URL parameters
router.get('/projects/:projectId/tasks/:status', async (req, res) => {
  const { projectId, status } = req.params;

  try {
    const tasks = await Task.find({
      projectId: projectId,
      status: status,
    });

    // Check if 'tasks' is an array and has elements
    if (Array.isArray(tasks) && tasks.length > 0) {
      res.json(tasks);
    } else {
      res.status(404).send('No tasks found matching the criteria.');
    }
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).send('An error occurred while fetching tasks.');
  }
});

module.exports = router;




// Get a specific task by ID for a project
router.get("/projects/:projectId/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, projectId: req.params.projectId });
    if (task) {
      res.send(task);
    } else {
      res.status(404).send({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update a task
router.put("/projects/:projectId/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) {
      res.status(404).send({ message: "Task not found" });
    } else {
      if (req.body.status === 'Emergency') {
        await sendEmergencyEmail(task);
      }
      res.send(task);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (task) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
