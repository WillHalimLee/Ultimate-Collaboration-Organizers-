// userRoutes.js
const express = require('express');
//const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const SECRET_KEY = 'your_secret_key';
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
        if (user && user.password === req.body.password) {
            // Generate a token
            const token = jwt.sign(
                { id: user.id, email: user.email },
                SECRET_KEY,
                { expiresIn: '1h' } // Token expires in 1 hour
            );

            // Send the token to the client
            res.status(200).send({ token: token });
        } else {
            res.status(400).send('Invalid Credentials');
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
