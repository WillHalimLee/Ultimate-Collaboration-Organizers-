// backend/src/models/Project.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        developers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User' // assuming you have a User model
            }
        ],
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User', // assuming you have a User model
            required: true, // assuming you want to make it mandatory that a project has a creator
        },
    },
    { timestamps: true, collection: "projects" } // Adding timestamps to automatically add `createdAt` and `updatedAt` fields
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
