const express = require("express");
const router = express.Router();
const Project = require("../models/Project");


router.get("/", async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


router.post("/", async (req, res) => {
  try {
    const { title, description, developers, manager } = req.body;
    if (!title || !description || !manager) {
      return res.status(400).send("Project title, description, and manager are required");
    }

    const project = new Project({
      title,
      description,
      developers,
      createdBy: manager,
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


router.get("/search", async (req, res) => {
  try {
    const { searchTerm } = req.query;
    const projects = await Project.find({
      title: { $regex: searchTerm, $options: "i" },
    });
    res.json(projects);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


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


router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, developers } = req.body;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.title = title || project.title;
    project.description = description || project.description;

    if (developers) project.developers = developers;

    await project.save();

    res.json(project);
  } catch (error) {
    console.error("Failed to update project:", error);
    res.status(500).send(error.message);
  }
});


module.exports = router;
