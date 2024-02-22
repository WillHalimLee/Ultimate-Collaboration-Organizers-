// userRoutes.js
const express = require('express');
//const bcrypt = require('bcrypt');
const User = require('../models/User'); // This link might need to be detailed.
const router = express.Router();

router.post('/register', async (req, res) => {
    const { Fname,Lname,phone,email,address, password,dob,job } = req.body;
    try {
        const user = await User.create({ Fname,Lname, phone,email,address, password, dob,job });
        res.status(201).send({ id: user.id, Fname: user.Fname,Lname: user.Lname, phone: user.phone,email: user.email,address: user.address, password: user.password,dob: user.dob, job:user.job}); // Only send back non-sensitive data
    } catch (error) {
        console.error('Registration error:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).send('Email already exists.');
        } else if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(e => e.message);
            return res.status(400).send(messages.join('; '));
        }
        res.status(500).send('An error occurred during registration.');
    }
});




router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (user && (await bcrypt.compare(req.body.password, user.password))) {
            // Add your code for successful login: Token generation, etc.
            res.status(200).send("Login Successful");
        } else {
            res.status(400).send('Invalid Credentials');
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
