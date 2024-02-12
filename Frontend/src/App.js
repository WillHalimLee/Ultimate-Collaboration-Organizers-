import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProjectModal from './components/ProjectModal';
import EditProjectComponent from './components/EditProjectComponent';
import ProjectSearch from './components/ProjectSearch';
import ProjectList from './components/ProjectList';
import TaskBoard from './components/TaskBoard'; // Import TaskBoard component
import { getAllProjects, createProject, deleteProject, updateProject } from './services/ProjectService';
import './App.css';
import * as ProjectService from "./services/ProjectService";
import Modal from 'react-modal';


const App = () => {
    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditComponentOpen, setIsEditComponentOpen] = useState(false);
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
            await deleteProject(projectId);
            fetchProjects(); // Refresh the projects list after deletion
        } catch (error) {
            console.error('Failed to delete project:', error);
        }
    };

    const handleProjectSubmit = async (projectData) => {
        try {
            if (projectData.id) {
                const updatedProject = await updateProject(projectData);
                // Assuming updateProject returns the updated project data
                setProjects(projects.map(proj => proj.id === projectData.id ? updatedProject : proj));
                setIsEditComponentOpen(false);
            } else {
                const newProject = await createProject(projectData);
                setProjects([...projects, newProject]);
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error('Failed to create/update project:', error);
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

    return (
        <BrowserRouter>
        <div className="app-container">
            <header className="app-header">
                <div className="website-name">Ultimate Collaborator Organize</div>
                {/* Dropdown for selecting user role */}
                <select onChange={(e) => setUserRole(e.target.value)} value={userRole}>
                    <option value="developer">Developer</option>
                    <option value="manager">Manager</option>
                </select>
                {userRole === 'manager' && (
                    <button className="button-create-project" onClick={handleOpenModalForCreate}>
                        Create project
                    </button>
                )}
            </header>
            <main className="main-content">
                <Routes>
                    <Route path="/" element={
                        <>
                            <ProjectSearch onSearchSubmit={fetchProjects}/>
                            <div>Projects Count: {projects.length}</div>
                            <ProjectList projects={projects} onDelete={handleDeleteProject}
                                         onEdit={handleOpenEditComponent} userRole={userRole}/>
                        </>
                    }/>
                    <Route path="/projects/:projectId/tasks" element={<TaskBoard/>}/>
                    {/* Define additional routes as needed */}
                </Routes>
            </main>
            {isModalOpen && userRole === 'manager' && (
                <ProjectModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleProjectSubmit}
                    project={editingProject}
                />
            )}
            {isEditComponentOpen && userRole === 'manager' && (
                <EditProjectComponent
                    projectId={editingProject ? editingProject.id : null}
                    onClose={() => setIsEditComponentOpen(false)}
                    onSubmit={handleProjectSubmit}
                    refreshProjects={fetchProjects}
                />
            )}

        </div>
        </BrowserRouter>
    );
};

export default App;
