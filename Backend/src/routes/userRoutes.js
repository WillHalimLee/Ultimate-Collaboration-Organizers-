// userRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // This link might need to be detailed.
const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
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
