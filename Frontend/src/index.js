import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login"; // Import your Login component
import ProjectBoard from "./ProjectBoard"; // Adjust the import path as needed
import TaskBoard from "./components/TaskBoard"; // Ensure you have an AuthProvider
import UserInformationPage from "./components/UserInformation"; // Ensure you have an AuthProvider
import WeeklyView from "./old/WeeklyView"; // Import your WeeklyView component

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<ProjectBoard />} />
        <Route path="/projects/:projectId/tasks" element={<TaskBoard />} />
        <Route path="/user-information" element={<UserInformationPage />} />
        <Route path="/weekly-view/:taskId" element={<WeeklyView />} />
        {/* Other routes... */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
