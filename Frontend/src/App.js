import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProjectCreat from './components/ProjectCreat';
import ProjectEdit from './components/ProjectEdit';
import ProjectSearch from './components/ProjectSearch';
import ProjectList from './components/ProjectList';
import TaskBoard from './components/TaskBoard';
import UserRegister from './components/UserRegister';
import UserInformation from './components/UserInformation'; // Update the path accordingly
import './App.css';
import * as ProjectService from "./services/ProjectService";

const App = () => {
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
    <BrowserRouter>
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
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <ProjectSearch onSearchSubmit={fetchProjects} />
                  <ProjectList
                    projects={projects}
                    onDelete={handleDeleteProject}
                    onEdit={handleOpenEditComponent}
                    userRole={userRole}
                  />
                </>
              }
            />
            <Route path="/projects/:projectId/tasks" element={<TaskBoard />} />
            <Route path="/user-information" element={<UserInformationPage />} />
          </Routes>
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
    </BrowserRouter>
  );
};

const UserInformationPage = () => {
  return (
    <div>
      <div>
        <UserInformation
          onClose={() => {
            // Handle closing the UserInformation component on this page
          }}
          onSave={(userData) => {
            // Handle saving user data (you can add your logic here)
            console.log('User data saved:', userData);
          }}
        />
      </div>
      {/* Add some spacing or margin here */}
      <div style={{ marginTop: '20px' }}>
        <Link to="/" className="button-create-project" style={{ textDecoration: 'none' }}>
          Back to Projects
        </Link>
      </div>
    </div>
  );
};

export default App;