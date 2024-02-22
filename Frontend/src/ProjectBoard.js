import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectCreat from './components/ProjectCreat';
import ProjectEdit from './components/ProjectEdit';
import ProjectSearch from './components/ProjectSearch';
import ProjectList from './components/ProjectList';

import UserRegister from './components/UserRegister';
import './App.css';
import * as ProjectService from "./services/ProjectService";

const ProjectBoard = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditComponentOpen, setIsEditComponentOpen] = useState(false);
  const [isRegisterComponentOpen, setIsRegisterComponentOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [userRole, setUserRole] = useState('developer');

  useEffect(() => {
    fetchProjects();
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
      console.error('Failed to delete project:', error);
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
  }

  return (

      <div className="app-container">
        <header className="app-header">
          <div className="website-name">Ultimate Collaborator Organize</div>

          <select onChange={(e) => setUserRole(e.target.value)} value={userRole}>
            <option value="developer">Developer</option>
            <option value="manager">Manager</option>
          </select>
          {userRole === 'manager' && (
            <>
              <button className="button-create-project" onClick={handleOpenModalForCreate}>
                Create project
              </button>
              <Link to="/user-information" className="button-create-project" style={{ textDecoration: 'none' }}>
              User Information
              </Link>
              <button className="button-create-project" onClick={handleOpenModalForRegister}>
                Register User
              </button>
            </>
          )}
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
        {isModalOpen && userRole === 'manager' && (
          <ProjectCreat
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            refreshProjects={fetchProjects}
          />
        )}
        {isEditComponentOpen && userRole === 'manager' && (
          <ProjectEdit
            projectId={editingProject ? editingProject.id : null}
            onClose={() => setIsEditComponentOpen(false)}
            refreshProjects={fetchProjects}
          />
        )}
        {isRegisterComponentOpen && userRole === 'manager' && (
          <UserRegister onClose={() => setIsRegisterComponentOpen(false)} />
        )}
      </div>

  );
};

export default ProjectBoard;