// frontend/src/components/ProjectForm.js
import React, { useState } from 'react';
import { createProject } from '../services/ProjectService';

const ProjectForm = ({ onProjectAdded }) => {
    const [projectTitle, setProjectTitle] = useState('');
    const [projectDescription, setProjectDescription] = useState(''); // Add state for description

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!projectTitle.trim() || !projectDescription.trim()) {
            alert('Both title and description are required.');
            return;
        }
        try {
            const newProject = await createProject({
                title: projectTitle,
                description: projectDescription,
            });
            onProjectAdded(newProject);
            setProjectTitle('');
            setProjectDescription('');
        } catch (error) {
            console.error('Failed to create project:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="Project Title"
                    required // This ensures the field is required for form submission
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Project Description"
                    required // This ensures the field is required for form submission
                ></textarea>
            </div>
            <button type="submit">Add Project</button>
        </form>
    );
};

export default ProjectForm;
