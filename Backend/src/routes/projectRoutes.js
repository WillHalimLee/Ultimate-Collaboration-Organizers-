// backend/src/routes/projectRoutes.js
const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const Project = require('../models/Project'); // Adjust the path if necessary

// Existing GET route for fetching all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.findAll();
        res.json(projects);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// POST route for creating a new project
router.post('/', async (req, res) => {
    try {
        // Ensure the request body contains necessary project data
        // You might want to validate the incoming data before attempting to create the project
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).send('Project title and description are required');
        }

        const project = await Project.create({
            title,
            description,
            // Add other fields as needed
        });

        res.status(201).json(project); // Respond with the created project
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/search', async (req, res) => {
    try {
        const { searchTerm } = req.query;
        const projects = await Project.findAll({
            where: {
                title: {
                    [Op.iLike]: `%${searchTerm}%` // For case-insensitive search with PostgreSQL
                }
            }
        });
        res.json(projects);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// GET route for fetching a single project by its ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findByPk(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// DELETE endpoint to remove a project by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Project.destroy({
            where: { id }
        });

        if (result > 0) {
            res.status(200).send('Project deleted successfully.');
        } else {
            res.status(404).send('Project not found.');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// In your projectRoutes.js or equivalent
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const project = await Project.findByPk(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        project.title = title;
        project.description = description;
        await project.save();

        res.json(project);
    } catch (error) {
        res.status(500).send(error.message);
    }
});



module.exports = router;
