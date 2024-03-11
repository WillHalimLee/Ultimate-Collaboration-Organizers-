import React, { useState, useEffect } from 'react';
import * as ProjectService from "../services/ProjectService";

import './css/ProjectModal.css';
import * as UserService from "../services/userService";

const ProjectCreate = ({ isOpen, onClose, refreshProjects }) => {
    const [project, setProject] = useState({
        title: '',
        description: '',
        developers: [],
        manager: '' // Add a manager field to your project state
    });
    const [developers, setDevelopers] = useState([]); // Add state for the list of developers

    useEffect(() => {
        // Function to fetch developers
        const fetchDevelopers = async () => {
            try {
                const devs = await UserService.getDevelopers();
                setDevelopers(devs);
            } catch (error) {
                console.error("Failed to fetch developers", error);
            }
        };

        // Get the manager's ID from localStorage and set it in the project state
        const managerId = JSON.parse(localStorage.getItem("user"));
        console.log("Manager ID:", managerId);
        setProject(prev => ({ ...prev, manager: managerId }));

        fetchDevelopers();
    }, []);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject((prev) => ({ ...prev, [name]: value }));
    };

    const handleDeveloperChange = (e) => {
        const selectedDevelopers = Array.from(e.target.selectedOptions, option => option.value);
        setProject(prev => ({ ...prev, developers: selectedDevelopers }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await ProjectService.createProject(project);
            refreshProjects();
            onClose();
        } catch (error) {
            console.error("Failed to create project", error);
        }
    };

    const handleDeveloperSelection = (devId) => {
        setProject(prev => {
            const newDevelopers = prev.developers.includes(devId)
                ? prev.developers.filter(id => id !== devId)
                : [...prev.developers, devId];
            return { ...prev, developers: newDevelopers };
        });
    };

  return (
        <div>
            <div>
                <h2>Create a New Project</h2>
                <form onSubmit={handleSubmit}>
                    <div>
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
                    <div>
                        <label htmlFor="projectDescription">Description</label>
                        <textarea
                            id="projectDescription"
                            name="description"
                            onChange={handleChange}
                            placeholder="Enter a project description"
                            required
                        />
                    </div>
                    <div>
                        <label>Developers</label>
                        <div>
                            {developers.map(dev => (
                                <label key={dev._id}>
                                    <input
                                        type="checkbox"
                                        checked={project.developers.includes(dev._id)}
                                        onChange={() => handleDeveloperSelection(dev._id)}
                                    />
                                    {dev.Fname + ' ' + dev.Lname}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <button type="button" onClick={onClose}>Cancel</button>
                        <button type="submit">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectCreate;
