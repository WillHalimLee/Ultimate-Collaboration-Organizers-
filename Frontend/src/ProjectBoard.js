import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectCreat from "./components/ProjectCreat";
import ProjectEdit from "./components/ProjectEdit";
import ProjectSearch from "./components/ProjectSearch";
import ProjectList from "./components/ProjectList";

import "./ProjectBoard.css";
import * as ProjectService from "./services/ProjectService";
import * as userService from "./services/userService";
import * as UserService from "./services/userService";
import * as TaskService from "./services/TaskService";
import logoutIcon from './logout.png';
import createProjectIcon from './add.png';
import userInformationIcon from './user.png';
import {getTasksReportByProjectId} from "./services/TaskService";



const ProjectBoard = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditComponentOpen, setIsEditComponentOpen] = useState(false);
  const [isRegisterComponentOpen, setIsRegisterComponentOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [userRole, setUserRole] = useState("developer");
  const [userDetails, setUserDetails] = useState(null);
  const [projectsWithDetails, setProjectsWithDetails] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tasksReport, setTasksReport] = useState({});


  useEffect(() => {
    fetchProjects();
    fetchUserDetails();
  }, []);

  const fetchProjects = async () => {
    try {
      const fetchedProjects = await ProjectService.getAllProjects();
      const projectsWithDetails = await Promise.all(fetchedProjects.map(async (project) => {
        let developersDetails = [];
        if (project.developers && project.developers.length > 0) {
          developersDetails = await Promise.all(
              project.developers
                  .filter(devId => devId != null)
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

        // Fetch the task report for the project
        let taskStatusCounts = [];
        try {
          taskStatusCounts = await TaskService.getTasksReportByProjectId(project._id);
        } catch (taskReportError) {
          console.error(`Failed to fetch task report for project ${project._id}: ${taskReportError}`);
        }

        return {
          ...project,
          developersDetails,
          managerDetails,
          taskStatusCounts // Include the task report data in the project's data
        };
      }));

      const groupedProjects = projectsWithDetails.reduce((acc, project) => {
        const createdBy = project.createdBy || 'unknown';
        // Use 'unknown' as a fallback
        if (!acc[createdBy]) {
          acc[createdBy] = [];
        }
        acc[createdBy].push(project);
        return acc;
      }, {});

      setProjectsWithDetails(groupedProjects); // Store the grouped projects
      console.log("groupedProjects", groupedProjects);

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

  //const handleOpenModalForRegister = () => {
   //setEditingProject(null);
   // setIsRegisterComponentOpen(true);
 // };

  const fetchUserDetails = async () => {
    try {
      const userString = localStorage.getItem("user");
      const userId = userString && JSON.parse(userString);
      const userDetails = await userService.getUserById(userId);
      setUserDetails(userDetails);
      console.log(userDetails.job);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

    return (
        <div className="app-container">
          <header className="app-header">
            <div className="website-name">UCO</div>

            <div className="menu-icon" onClick={handleToggleMenu}>
              ☰
            </div>

            {isMenuOpen && (
                <div className="dropdown-menu">
                  {userDetails?.job === "manager" && (
                      <>
                        <button className="menu-item" onClick={handleOpenModalForCreate}>
                          <img src={createProjectIcon} alt="Create Project" className="icon"/>
                        </button>
                      </>
                  )}

                  <button
                      className="menu-item link-button"
                      onClick={() => window.location.href = "/user-information"}
                  >
                    <img src={userInformationIcon} alt="User Information" className="icon"/>
                  </button>
                  <button
                      className="menu-item link-button"
                      onClick={() => window.location.href = "/"}
                  >
                    <img src={logoutIcon} alt="Logout" className="icon"/>
                  </button>
                  <button
                      className="menu-item link-button"
                      onClick={() => window.location.href = "/user-register"}
                  >
                    <img src={userInformationIcon} alt="User Register" className="icon"/>
                  </button>
                </div>
            )}
          </header>
          <main className="main-content">
            {Object.entries(projectsWithDetails).map(([managerId, managerProjects]) => {
              // Assuming managerProjects is an array and the first project has a populated managerDetails
              const managerName = managerProjects.length > 0 && managerProjects[0].managerDetails
                  ? `${managerProjects[0].managerDetails.Fname} ${managerProjects[0].managerDetails.Lname}`
                  : 'Unknown Manager';

              return (
                  <div key={managerId} className="manager-column">
                    <h2>Projects Created By: {managerName}</h2>
                    <ProjectList
                        projects={managerProjects} // Pass the array of projects for this manager
                        onDelete={handleDeleteProject}
                        onEdit={handleOpenEditComponent}
                        userRole={userDetails?.job}
                    />
                  </div>
              );
            })}
          </main>


          {
              isModalOpen && userDetails?.job === "manager" && (
                  <ProjectCreat isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} refreshProjects={fetchProjects}/>
              )
          }
          {
              isEditComponentOpen && userDetails?.job === "manager" && (
                  <ProjectEdit
                      projectId={editingProject}
                      onClose={() => setIsEditComponentOpen(false)}
                      refreshProjects={fetchProjects}
                  />
              )
          }
        </div>
    )
        ;
};

export default ProjectBoard;
