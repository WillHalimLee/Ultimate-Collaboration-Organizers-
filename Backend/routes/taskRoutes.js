const express = require("express");
const Task = require("../models/Task");
const {sendEmergencyEmail} = require("../services/emailService");
const {Types} = require("mongoose");
const router = express.Router();

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


router.get("/projects/:projectId/tasks/report", async (req, res) => {
  const { projectId } = req.params;

  try {
    const tasksReport = await Task.aggregate([
      { $match: { projectId: new Types.ObjectId(projectId) } },
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    res.json(tasksReport);
  } catch (error) {
    console.error('Error generating tasks report:', error);
    res.status(500).send('An error occurred while generating the tasks report.');
  }
});

router.get('/projects/:projectId/tasks/dates', async (req, res) => {
  const { projectId } = req.params;

  try {
    const tasks = await Task.find({ projectId: projectId }, 'createdAt dueDate title')
        .exec();

    const tasksWithDates = tasks.map(task => ({
      title: task.title,
      start: task.createdAt,
      end: task.dueDate
    }));

    res.json(tasksWithDates);
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    res.status(500).send({ message: "An error occurred while fetching tasks.", error: error.message });
  }
});
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
router.get('/projects/:projectId/tasks/status/:status', async (req, res) => {
  const { projectId, status } = req.params;

  try {
    const tasks = await Task.find({
      projectId: projectId,
      status: status,
    });

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





module.exports = router;
