// backend/src/app.js
const express = require('express');
const sequelize = require('./config/sequelize'); // Adjust the path as necessary
const Project = require('./models/Project'); // Import the model
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes'); // Adjust path as necessary

const app = express();
app.use(express.json());
app.use('/api/projects', projectRoutes);
app.use('/api', taskRoutes);
// Sync all models with the database
sequelize.sync().then(() => {
    console.log('Database synced');
});

// Define routes here

const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
