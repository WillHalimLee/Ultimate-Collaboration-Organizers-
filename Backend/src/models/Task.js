// models/Task.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class Task extends Model {}

Task.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pending', // Example statuses: Pending, In Progress, Completed
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Projects', // Note: Use the table name defined in your Project model
            key: 'id',
        },
    },
}, {
    sequelize,
    modelName: 'Task',
    timestamps: true, // Enable timestamps if desired
});

module.exports = Task;
