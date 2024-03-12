const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Task = require("../models/Task");
const router = express.Router();
const SECRET_KEY = "your_secret_key";

router.post("/register", async (req, res) => {
  const { Fname, Lname, phone, email, address, password, dob, job } = req.body;
  try {

    const user = new User({
      Fname,
      Lname,
      phone,
      email,
      address,
      password,
      dob,
      job,
    });

    await user.save();

    res.status(201).send({
      id: user.id,
      Fname: user.Fname,
      Lname: user.Lname,
      phone: user.phone,
      email: user.email,
      address: user.address,

      dob: user.dob,
      job: user.job,
    });
  } catch (error) {
    console.error("Registration error:", error);
    if (error.code === 11000) {

      return res.status(400).send("Email already exists.");
    }
    res.status(500).send("An error occurred during registration.");
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("Invalid Credentials, Wrong Email.");
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    console.log(isMatch);
    if (isMatch) {
      // Generate a token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        SECRET_KEY,
        { expiresIn: "1h" }
      );


      res.status(200).send({ token: token, ID: user.id});
    } else {
      res.status(400).send("Invalid Credentials, Wrong Password.");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/developers', async (req, res) => {
  console.log('Fetching developers...');
  try {
    const developers = await User.find({ job: "developer" }).exec();
    console.log('Developers:', developers);
    res.json(developers);
  } catch (error) {
    console.log('Error fetching developers:', error);
    res.status(500).send('opaasd');
  }
});
router.get('/developers/:developerId/stats', async (req, res) => {
  const { developerId } = req.params;

  try {
    // Validate that the user is a developer
    const developer = await User.findOne({ _id: developerId, job: "developer" });
    if (!developer) {
      return res.status(404).send('Developer not found.');
    }


    const tasksGroupedByStatus = await Task.aggregate([
      { $match: { assignedTo: developer._id } },
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    console.log('Tasks grouped by status:', tasksGroupedByStatus);


    const statusCounts = {
      pending: 0,
      inprogress: 0,
      emergency: 0,
      Completed: 0,
    };


    tasksGroupedByStatus.forEach((statusGroup) => {

      const statusKey = statusGroup._id.toLowerCase().replace(/\s+/g, '');
      if (statusCounts.hasOwnProperty(statusKey)) {
        statusCounts[statusKey] = statusGroup.count;
      }
    });


    res.json({ developer: developerId, stats: statusCounts });
  } catch (error) {
    console.error('Error fetching developer stats:', error);
    res.status(500).send('An error occurred while fetching developer statistics.');
  }
});



router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.send(user);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

//update
router.put('/:id', async (req, res) => {
  console.log(req.body)
  console.log('UserID to update:', req.body._id);
  try {
    const userUpdates = req.body;
    const userId = req.params.id;

    const user = await User.findByIdAndUpdate(userId, userUpdates, { new: true });

    if (!user) {
      return res.status(404).send('User not found.');
    }

    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
