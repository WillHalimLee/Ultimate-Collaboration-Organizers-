// backend/src/models/Project.js
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    // define your model attributes here
    title: {
      type: String,
      required: true, // This is the correct way to enforce the field is not null
    },
    description: {
      type: String,
      required: true, // This is the correct way to enforce the field is not null
    },
    // more attributes...
  },
  { collection: "projects" } // Corrected the typo here and used the plural form which is a common convention
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
