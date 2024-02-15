import React, {useEffect, useState} from 'react';
import './ProjectModal.css';

const ProjectModal = ({ isOpen, onClose, onSubmit, project = {} }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    useEffect(() => {
        if (isOpen && project && project.id) {
            setTitle(project.title);
            setDescription(project.description);
        } else {
            setTitle('');
            setDescription('');
        }
    }, [isOpen, project]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            id: project?.id,
            title,
            description,
        });
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>{project && project.id ? 'Edit Project' : 'Create a New Project'}</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-group">
                        <label htmlFor="projectName">Project Name</label>
                        <input
                            id="projectName"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter a name for your project"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="projectDescription">Description</label>
                        <textarea
                            id="projectDescription"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter a project description"
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="button" onClick={onClose}>Cancel</button>
                        <button type="submit">{project && project.id ? 'Save Changes' : 'Create'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectModal;
