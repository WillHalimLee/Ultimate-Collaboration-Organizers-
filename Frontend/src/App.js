import React, { useState, useEffect } from 'react';
import ProjectModal from './components/ProjectModal';
import EditProjectComponent from './components/EditProjectComponent'; // Import the new EditProjectComponent
import ProjectSearch from './components/ProjectSearch';
import ProjectList from './components/ProjectList';
import { getAllProjects, createProject, deleteProject, updateProject } from './services/ProjectService';
import './App.css';
import * as ProjectService from "./services/ProjectService";

const App = () => {
    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditComponentOpen, setIsEditComponentOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [userRole, setUserRole] = useState('developer'); // New state for user role

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
            <div className="main-content">
                <ProjectSearch onSearchSubmit={fetchProjects} />
                <div className="project-counter">My Projects | {projects.length}</div>
                <ProjectList
                    projects={projects}
                    onDelete={handleDeleteProject}
                    onEdit={handleOpenEditComponent}
                    userRole={userRole} // Pass the userRole as a prop
                />

            </div>
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
    );
};

export default App;
