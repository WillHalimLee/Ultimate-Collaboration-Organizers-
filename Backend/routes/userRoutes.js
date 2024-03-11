const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {find} = require("../models/Task"); // Assuming this is a Mongoose model
const router = express.Router();
const SECRET_KEY = "your_secret_key";

router.post("/register", async (req, res) => {
  const { Fname, Lname, phone, email, address, password, dob, job } = req.body;
  try {
    // Hash password before saving
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
      // Do not send back the password, even if it's hashed
      dob: user.dob,
      job: user.job,
    });
  } catch (error) {
    console.error("Registration error:", error);
    if (error.code === 11000) {
      // MongoDB duplicate key error
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
        { expiresIn: "1h" } // Token expires in 1 hour
      );

      // Send the token to the client
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
    const developers = await User.find({ job: "developer" }).exec(); // Use .exec() to return a true Promise
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

    // Fetch tasks assigned to the developer
    const tasksAssigned = await find({ assignedTo: developerId });
    const tasksCompleted = tasksAssigned.filter(task => task.status === 'Completed').length;
    const totalTasks = tasksAssigned.length;

    // Calculate statistics (for simplicity, only total tasks and completed tasks are calculated)
    const stats = {
      totalTasks,
      tasksCompleted,
      completionRate: totalTasks > 0 ? (tasksCompleted / totalTasks * 100).toFixed(2) + '%' : 'N/A',
    };

    res.json({ developer: developerId, stats });
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

    // Make sure to validate userUpdates or sanitize it as needed

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

//get developers
// Assuming `User` is your Mongoose model for users




module.exports = router;
