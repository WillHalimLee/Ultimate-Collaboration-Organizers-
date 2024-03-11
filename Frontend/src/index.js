import React from "react";
import ReactDOM from "react-dom/client"; // Change this import to 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
// ... other imports
import DevelopersStatsPage from "./components/developerStatics";
import Login from "./login";
import ProjectBoard from "./ProjectBoard";
import TaskBoard from "./components/TaskBoard";
import WeeklyView from "./old/WeeklyView"; // Ensure this is the correct path
import UserInformationPage from "./components/UserInformation"; // Ensure you have an
import UserRegisterPage from "./components/UserRegister";

// Find the root div in your index.html
const rootElement = document.getElementById("root");

// Use createRoot to manage the root element
const root = ReactDOM.createRoot(rootElement);

// Now use root.render to render your app components
root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/app" element={<ProjectBoard />} />
          <Route path="/projects/:projectId/tasks" element={<TaskBoard />} />
          <Route path="/user-information" element={<UserInformationPage />} />
          <Route path="/user-register" element={<UserRegisterPage />} />
          <Route path="/weekly-view/:taskId" element={<WeeklyView />} />
          <Route path="/developers-stats" element={<DevelopersStatsPage />} />
          {/* Other routes... */}
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
);
