// frontend/src/components/ProjectList.js
import React, { useEffect, useState } from 'react';
import { getAllProjects } from '../services/ProjectService';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projects = await getAllProjects();
                setProjects(projects);
            } catch (error) {
                console.error('Failed to fetch projects:', error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div>
            <h2>Projects</h2>
            <ul>
                {projects.map(project => (
                    <li key={project.id}>{project.title}</li> // Adjust according to your project's attributes
                ))}
            </ul>
        </div>
    );
};

export default ProjectList;
