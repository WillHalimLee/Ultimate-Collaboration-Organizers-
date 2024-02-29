const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./doc.yaml');

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
// Import routes
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(express.json());

// MongoDB Connection String
const mongoDBConnectionString =
  "mongodb+srv://tcss460:ivTEidSQoxDb1CdW@tcss460project.l51fo53.mongodb.net/Tcss460Project?retryWrites=true&w=majority&appName=Tcss460Project";
// Connect to MongoDB
mongoose
  .connect(mongoDBConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully."))
  .catch((error) => console.error("MongoDB connection error:", error));

// Define routes
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes); // Assuming you want to structure your task API like this
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
