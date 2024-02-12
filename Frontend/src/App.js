// frontend/src/App.js
import React, { useState } from 'react';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';

const App = () => {
    const [projects, setProjects] = useState([]);

    // Function to add a project to the local state
    const handleProjectAdded = (newProject) => {
        setProjects([...projects, newProject]);
    };

    return (
        <div>
            <ProjectForm onProjectAdded={handleProjectAdded} />
            <ProjectList projects={projects} />
        </div>
    );
};

export default App;