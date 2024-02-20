import React, { useState} from 'react';
import * as ProjectService from "../services/ProjectService";
import './css/ProjectModal.css';

const ProjectCreat = ({ isOpen, onClose,refreshProjects }) => {
    const [project, setProject] = useState({ title: '', description: '' });

    if (!isOpen) return null;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            await ProjectService.createProject(project);
            refreshProjects();
            onClose();
        } catch (error) {
            console.error("Failed to update project", error);
        }
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Create a New Project</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-group">
                        <label htmlFor="projectName">Project Name</label>
                        <input
                            id="projectName"
                            name="title"
                            type="text"

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

                            onChange={handleChange}
                            placeholder="Enter a project description"
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="button" className="button-cancel" onClick={onClose}>Cancel</button>
                        <button type="submit" className="button-save">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectCreat;
