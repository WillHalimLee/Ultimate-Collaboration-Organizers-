const express = require("express");
const Task = require("../models/Task"); // Adjust the path if necessary
const router = express.Router();

// Create a new task
router.post("/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(500).send({ message: "Error creating task", error: error.message });
  }
});

// Get all tasks for a specific project
router.get("/projects/:projectId/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId });
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

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
      res.send(task);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete a task
router.delete("/tasks/:id", async (req, res) => {
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
