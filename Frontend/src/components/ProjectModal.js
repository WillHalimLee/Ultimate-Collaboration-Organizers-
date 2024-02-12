// frontend/src/components/ProjectModal.js
import React, { useState } from 'react';
import './ProjectModal.css'; // Import the CSS file

const ProjectModal = ({ isOpen, onClose, onProjectSubmit }) => {
    const [projectTitle, setProjectTitle] = useState('');
    const [projectDescription, setProjectDescription] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!projectTitle.trim() || !projectDescription.trim()) {
            alert('Both title and description are required.');
            return;
        }
        // Call the onProjectSubmit function passed from the parent component
        onProjectSubmit({
            title: projectTitle,
            description: projectDescription,
        });
        // Clear the form fields
        setProjectTitle('');
        setProjectDescription('');
    };

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Create a new project</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label htmlFor="projectName">Project Name</label>
                        <input
                            id="projectName"
                            type="text"
                            value={projectTitle}
                            onChange={(e) => setProjectTitle(e.target.value)}
                            placeholder="Enter a name for your project"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="projectDescription">Description</label>
                        <textarea
                            id="projectDescription"
                            value={projectDescription}
                            onChange={(e) => setProjectDescription(e.target.value)}
                            placeholder="Enter a project description"
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="button" onClick={onClose}>Cancel</button>
                        <button type="submit">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectModal;
