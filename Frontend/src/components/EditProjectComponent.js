import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Assuming you have a styling file similar to ProjectModal.css
//import './EditProjectComponent.css';
import * as ProjectService from "../services/ProjectService";


const EditProjectComponent = ({ projectId, onClose, refreshProjects }) => {
    const [project, setProject] = useState({ title: '', description: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [name, setName] = useState(''); // Initialize with an empty string or current value
    const [description, setDescription] = useState(''); // Initialize similarly

    // Fetch the project data when the component mounts or projectId changes
    useEffect(() => {
        const fetchProject = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`/api/projects/${projectId}`);
                setProject(response.data);
            } catch (err) {
                setError('Failed to fetch project data.');
            } finally {
                setIsLoading(false);
            }
        };

        if (projectId) {
            fetchProject();
        }
    }, [projectId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Ensure projectId is defined and is not undefined
        if (!projectId) {
            console.error("Project ID is undefined");
            return;
        }
        try {
            await ProjectService.updateProject(projectId, project);
            refreshProjects(); // Call the passed-in callback to refresh the project list
            onClose(); // Close the modal/form
        } catch (error) {
            console.error("Failed to update project", error);
        }
    };




    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Edit Project</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label htmlFor="projectName">Project Name</label>
                        <input
                            id="projectName"
                            type="text"
                            name="title"
                            value={project.title}
                            onChange={handleChange}
                            placeholder="Enter a name for your project"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="projectDescription">Description</label>
                        <textarea
                            id="projectDescription"
                            name="description"
                            value={project.description}
                            onChange={handleChange}
                            placeholder="Enter a project description"
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="button" className="button-cancel" onClick={onClose}>Cancel</button>
                        <button type="submit" className="button-save">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProjectComponent;
