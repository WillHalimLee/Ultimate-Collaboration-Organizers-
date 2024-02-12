// frontend/src/components/ProjectList.js
import React, { useEffect, useState } from 'react';
import { getAllProjects } from '../services/ProjectService';

const ProjectList = ({ projects, onDelete }) => {



    return (
        <div className="project-list">
            {projects.map((project) => (
                <div key={project.id} className="project-item">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <button onClick={() => onDelete(project.id)}>Delete</button>
                </div>
            ))}
        </div>
    );

};

export default ProjectList;
