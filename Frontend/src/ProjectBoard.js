import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectCreat from "./components/ProjectCreat";
import ProjectEdit from "./components/ProjectEdit";
import ProjectSearch from "./components/ProjectSearch";
import ProjectList from "./components/ProjectList";

import UserRegister from "./components/UserRegister";
import "./App.css";
import * as ProjectService from "./services/ProjectService";
import * as userService from "./services/userService";

const ProjectBoard = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditComponentOpen, setIsEditComponentOpen] = useState(false);
  const [isRegisterComponentOpen, setIsRegisterComponentOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [userRole, setUserRole] = useState("developer");
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    fetchProjects();
    fetchUserDetails();
  }, []);

  const fetchProjects = async () => {
    const fetchedProjects = await ProjectService.getAllProjects();
    setProjects(fetchedProjects);
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await ProjectService.deleteProject(projectId);
      fetchProjects();
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  const handleOpenModalForCreate = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleOpenEditComponent = (project) => {
    setEditingProject(project);
    setIsEditComponentOpen(true);
  };

  const handleOpenModalForRegister = () => {
    setEditingProject(null);
    setIsRegisterComponentOpen(true);
  };

  const fetchUserDetails = async () => {
    try {
      const userString = localStorage.getItem("user");
      const userId = userString && JSON.parse(userString);
      const userDetails = await userService.getUserById(userId);
      setUserDetails(userDetails); // Set user details state
      console.log(userDetails.job);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="website-name">Ultimate Collaborator Organize</div>

        {userDetails?.job === "manager" && (
          <>
            <button className="button-create-project" onClick={handleOpenModalForCreate}>
              Create project
            </button>

            <button className="button-create-project" onClick={handleOpenModalForRegister}>
              Register User
            </button>
          </>
        )}
        <Link to="/user-information" className="button-create-project" style={{ textDecoration: "none" }}>
          User Information
        </Link>
      </header>
      <main className="main-content">
        <ProjectSearch onSearchSubmit={fetchProjects} />
        <ProjectList
          projects={projects}
          onDelete={handleDeleteProject}
          onEdit={handleOpenEditComponent}
          userRole={userRole}
        />
      </main>
      {isModalOpen && userRole === "manager" && (
          <>
            <ProjectCreat isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} refreshProjects={fetchProjects} />
            <ProjectEdit
                projectId={editingProject ? editingProject.id : null}
                onClose={() => setIsEditComponentOpen(false)}
                refreshProjects={fetchProjects}
            />
            <UserRegister onClose={() => setIsRegisterComponentOpen(false)} />
          </>


      )}
    </div>
  );
};

export default ProjectBoard;
