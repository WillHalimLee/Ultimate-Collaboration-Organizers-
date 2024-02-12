import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Assuming you have a styling file similar to ProjectModal.css
import './EditProjectComponent.css';

const EditProjectComponent = ({ projectId, onClose }) => {
    const [project, setProject] = useState({ title: '', description: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.put(`/api/projects/${projectId}`, project);
            onClose(); // Close the modal or editing component
            window.location.reload(); // Add this line to reload the page
        } catch (err) {
            setError('Failed to update the project.');
        } finally {
            setIsLoading(false);
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
