// backend/src/models/Project.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Project = sequelize.define('Project', {
    // define your model attributes here
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    // more attributes...
});

module.exports = Project;
