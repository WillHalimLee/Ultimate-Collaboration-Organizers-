// frontend/src/components/ProjectList.js
import React, { useEffect, useState } from 'react';
import { getAllProjects } from '../services/ProjectService';

// ProjectList.js
const ProjectList = ({ projects, onDelete, onEdit, userRole }) => {
    return (
        <div className="project-list">
            {projects.map((project) => (
                <div key={project.id} className="project-item">
                    <h3>{project.title} (ID: {project.id})</h3>
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
