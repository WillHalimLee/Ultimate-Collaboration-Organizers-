import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import DevelopersStatsPage from "./components/developerStatics";
import Login from "./login";
import ProjectBoard from "./ProjectBoard";
import TaskBoard from "./components/TaskBoard";
import UserInformationPage from "./components/UserInformation";
import UserRegisterPage from "./components/UserRegister";
import CalendarView from "./components/CalendarView";

const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<ProjectBoard />} />
        <Route path="/projects/:projectId/tasks" element={<TaskBoard />} />
        <Route path="/user-information" element={<UserInformationPage />} />
        <Route path="/user-register" element={<UserRegisterPage />} />
        <Route path="/weekly-view/:projectId" element={<CalendarView />} />
        <Route path="/developers-stats" element={<DevelopersStatsPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
