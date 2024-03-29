import React, { useState, useEffect } from "react";
import * as ProjectService from "../services/ProjectService";
import "./css/projectCreate.css"; 
import * as UserService from "../services/userService";

const ProjectCreate = ({ isOpen, onClose, refreshProjects }) => {
  const [project, setProject] = useState({
    title: "",
    description: "",
    developers: [],
    manager: "", 
  });
  const [developers, setDevelopers] = useState([]); 

  useEffect(() => {

    const fetchDevelopers = async () => {
      try {
        const devs = await UserService.getDevelopers();
        setDevelopers(devs);
      } catch (error) {
        console.error("Failed to fetch developers", error);
      }
    };


    const managerId = JSON.parse(localStorage.getItem("user"));
    console.log("Manager ID:", managerId);
    setProject((prev) => ({ ...prev, manager: managerId }));

    fetchDevelopers();
  }, []);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeveloperChange = (e) => {
    const selectedDevelopers = Array.from(e.target.selectedOptions, (option) => option.value);
    setProject((prev) => ({ ...prev, developers: selectedDevelopers }));
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
    setProject((prev) => {
      const newDevelopers = prev.developers.includes(devId) ? prev.developers.filter((id) => id !== devId) : [...prev.developers, devId];
      return { ...prev, developers: newDevelopers };
    });
  };

  return (
    <div className={`project-modal ${isOpen ? "open" : "closed"}`}>
      <div className="modal-content">
        <h2>Create a New Project</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="projectName">Project Name</label>
            <input id="projectName" name="title" type="text" onChange={handleChange} placeholder="Enter a name for your project" required />
          </div>
          <div>
            <label htmlFor="projectDescription">Description</label>
            <textarea id="projectDescription" name="description" onChange={handleChange} placeholder="Enter a project description" required />
          </div>
          <div>
            <label>Developers</label>
            <div className="ad">
              {developers.map((dev) => (
                <label key={dev._id}>
                  <input type="checkbox" checked={project.developers.includes(dev._id)} onChange={() => handleDeveloperSelection(dev._id)} />
                  {dev.Fname + " " + dev.Lname}
                </label>
              ))}
            </div>
          </div>
          <div>
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="create-button">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectCreate;
