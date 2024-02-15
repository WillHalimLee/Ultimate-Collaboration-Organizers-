import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './ProjectList.css';


const ProjectList = ({ projects, onDelete, onEdit, userRole }) => {
    return (
        <div className="project-list">
            {projects.map((project) => (
                <div key={project.id} className="project-item">
                    <h3>
                        <Link to={`/projects/${project.id}/tasks`}>{project.title} (ID: {project.id})</Link>
                    </h3>
                    <p>{project.description}</p>
                    {userRole === 'manager' && (
                        <>
                            <button onClick={() => onDelete(project.id)}>Delete</button>
                            <button onClick={() => onEdit(project)}>Edit</button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ProjectList;
