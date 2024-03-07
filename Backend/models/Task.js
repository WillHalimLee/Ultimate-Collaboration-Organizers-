const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: "",
        },
        status: {
            type: String,
            required: true,
            default: "Pending", // Example statuses: Pending, In Progress, Completed
        },
        dueDate: {
            type: Date,
            default: null,
        },
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Project",
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User", // Reference to the User model
        },
        assignedTo: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference to the User model
        }],
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
