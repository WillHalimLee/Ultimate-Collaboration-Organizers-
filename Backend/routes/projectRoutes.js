const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// GET route for fetching all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// POST route for creating a new project
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).send("Project title and description are required");
    }

    const project = new Project({
      title,
      description,
      // Add other fields as needed
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET route for searching projects by title
router.get("/search", async (req, res) => {
  try {
    const { searchTerm } = req.query;
    const projects = await Project.find({
      title: { $regex: searchTerm, $options: "i" }, // Case-insensitive search
    });
    res.json(projects);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET route for fetching a single project by its ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// DELETE endpoint to remove a project by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Project.deleteOne({ _id: id });

    if (result.deletedCount > 0) {
      res.status(200).send("Project deleted successfully.");
    } else {
      res.status(404).send("Project not found.");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// PUT endpoint to update a project by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.title = title || project.title;
    project.description = description || project.description;
    await project.save();

    res.json(project);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
