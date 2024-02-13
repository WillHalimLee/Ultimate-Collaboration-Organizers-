// routes/taskRoutes.js
const express = require('express');
const Task = require("../models/Task"); // Adjust the path if necessary
const router = express.Router();

// Create a new task
router.post('/tasks', async (req, res) => {
    const { title, description, status, dueDate, projectId } = req.body;

    // Validate projectId is not null
    if (!projectId) {
        return res.status(400).send({ message: 'Project ID is required' });
    }

    try {
        const task = await Task.create({ title, description, status, dueDate, projectId });
        res.status(201).send(task);
    } catch (error) {
        res.status(500).send({ message: 'Error creating task', error: error.message });
    }
});

// Get all tasks for a specific project
router.get('/projects/:projectId/tasks', async (req, res) => {
    try {
        const tasks = await Task.findAll({
            where: { projectId: req.params.projectId },
        });
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/projects/:projectId/tasks/:id', async (req, res) => {
    try {
        const tasks = await Task.findAll({
            where: { projectId: req.params.projectId , id: req.params.id},
        });
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a task
router.put('/projects/:projectId/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            await task.update(req.body);
            res.send(task);
        } else {
            res.status(404).send({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a task
router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            await task.destroy();
            res.status(204).send();
        } else {
            res.status(404).send({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
