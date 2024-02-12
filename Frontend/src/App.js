// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import ProjectModal from './components/ProjectModal';
import ProjectSearch from './components/ProjectSearch';
import ProjectList from './components/ProjectList';
import {getAllProjects, createProject, searchProjects, deleteProject} from './services/ProjectService';
import './App.css';

const App = () => {
    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const fetchedProjects = await getAllProjects();
            setProjects(fetchedProjects);
            setSearchResults(fetchedProjects); // Initialize searchResults with all projects
        };

        fetchProjects();
    }, []);

    const handleDeleteProject = async (projectId) => {
        try {
            await deleteProject(projectId);
            setProjects(projects.filter(project => project.id !== projectId));
        } catch (error) {
            console.error('Failed to delete project:', error);
            // Optionally, display an error message to the user
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = async () => {
        try {
            // Use the searchProjects service function to perform the search
            const results = await searchProjects(searchTerm);
            setProjects(results); // Update the state with the search results
        } catch (error) {
            console.error('Failed to search projects:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCreateProject = async (projectData) => {
        try {
            const newProject = await createProject(projectData);
            setProjects(prevProjects => [...prevProjects, newProject]);
            setIsModalOpen(false); // Close the modal after creation
        } catch (error) {
            console.error('Failed to create project:', error);
        }
    };

    const visibleProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="app-container">
            <header className="app-header">
                <div className="website-name">Ultimate Collaborator Organize</div>
                <ul className="tabs">
                    <li className="tab active">Projects</li>
                    <li className="tab">Workspaces</li>
                </ul>
                <button className="button-create-project" onClick={() => setIsModalOpen(true)}>
                    Create project
                </button>
            </header>
            <div className="main-content">
                <ProjectSearch
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                    onSearchSubmit={handleSearchSubmit}
                />
                <div className="project-counter">My Projects | {visibleProjects.length}</div>
                <ProjectList projects={projects} onDelete={handleDeleteProject} />
            </div>
            <ProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onProjectSubmit={handleCreateProject}
            />
        </div>
    );
};

export default App;
