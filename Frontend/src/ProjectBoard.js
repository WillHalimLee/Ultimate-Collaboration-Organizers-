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
import * as UserService from "./services/userService";

const ProjectBoard = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditComponentOpen, setIsEditComponentOpen] = useState(false);
  const [isRegisterComponentOpen, setIsRegisterComponentOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [userRole, setUserRole] = useState("developer");
  const [userDetails, setUserDetails] = useState(null);
  const [projectsWithDetails, setProjectsWithDetails] = useState([]);

  useEffect(() => {
    fetchProjects();
    //fetchFullProjectDetails();
    fetchUserDetails();
  }, []);

  // const fetchProjects = async () => {
  //   const fetchedProjects = await ProjectService.getAllProjects();
  //   setProjects(fetchedProjects);
  // };



// This could be in a higher-order component or page component where you fetch projects
  const fetchProjects = async () => {
    try {
      const fetchedProjects = await ProjectService.getAllProjects();
      const projectsWithDetails = await Promise.all(fetchedProjects.map(async (project) => {
        let developersDetails = [];
        if (project.developers && project.developers.length > 0) {
          developersDetails = await Promise.all(
              project.developers
                  .filter(devId => devId != null) // Filter out any null IDs
                  .map(async (devId) => {
                    const devDetails = await UserService.getUserById(devId);
                    return devDetails;
                  })
          );
        }

        let managerDetails = null;
        if (project.createdBy) {
          try {
            managerDetails = await UserService.getUserById(project.createdBy);
          } catch (managerError) {
            console.error(`Failed to fetch manager details: ${managerError}`);
          }
        }

        return {
          ...project,
          developersDetails,
          managerDetails,
        };
      }));

      setProjectsWithDetails(projectsWithDetails);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
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

  const handleOpenEditComponent = (projectID) => {
    setEditingProject(projectID);
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
        <Link to="/" className="button-create-project" style={{ textDecoration: "none" }}>
            Login Out
        </Link>
      </header>
      <main className="main-content">
        <ProjectSearch onSearchSubmit={fetchProjects} />
        <ProjectList
          projects={projectsWithDetails}
          onDelete={handleDeleteProject}
          onEdit={handleOpenEditComponent}
          userRole={userDetails?.job}
        />
      </main>
      {isModalOpen && userDetails?.job === "manager" && (
          <ProjectCreat isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} refreshProjects={fetchProjects} />
      )}
      {isEditComponentOpen && userDetails?.job === "manager" && (
          <ProjectEdit
              projectId={editingProject}
              onClose={() => setIsEditComponentOpen(false)}
              refreshProjects={fetchProjects}
          />
      )}
      {isRegisterComponentOpen && userDetails?.job === "manager" && (
          <UserRegister onClose={() => setIsRegisterComponentOpen(false)} />
      )}
    </div>
  );
};

export default ProjectBoard;
