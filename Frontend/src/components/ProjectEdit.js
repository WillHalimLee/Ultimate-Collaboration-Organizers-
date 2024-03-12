import React, { useState, useEffect } from "react";
import * as ProjectService from "../services/ProjectService";
import * as UserService from "../services/userService";
import "./css/projectCreate.css";

const ProjectEdit = ({ projectId, onClose, refreshProjects }) => {
  const [project, setProject] = useState({
    title: "",
    description: "",
    developers: [],
    manager: "",
  });
  const [allDevelopers, setAllDevelopers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDevelopers = async () => {
      setIsLoading(true);
      try {
        const devs = await UserService.getDevelopers();
        setAllDevelopers(devs);
      } catch (error) {
        console.error("Failed to fetch developers", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchProject = async () => {
      setIsLoading(true);
      try {
        const response = await ProjectService.getProjectByID(projectId);
        const fetchedDevelopers = response.developers || [];
        const developersDetails = await Promise.all(
          fetchedDevelopers.map(async (devId) => {
            const devDetails = await UserService.getUserById(devId);
            return devDetails;
          })
        );
        const developerIds = developersDetails.map((dev) => dev._id);
        setProject({
          ...response,
          developers: developerIds,
        });
      } catch (error) {
        console.error("Failed to fetch project data.", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (projectId) {
      fetchProject();
      fetchDevelopers();
    }
  }, [projectId]);

  const handleDeveloperSelection = (devId) => {
    setProject((prev) => ({
      ...prev,
      developers: prev.developers.includes(devId) ? prev.developers.filter((id) => id !== devId) : [...prev.developers, devId],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!projectId) {
      console.error("Project ID is undefined");
      return;
    }
    try {
      await ProjectService.updateProject(projectId, project);
      refreshProjects();
      onClose();
    } catch (error) {
      console.error("Failed to update project", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div>
        <h2>Edit Project</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="projectName">Project Name</label>
            <input id="projectName" type="text" name="title" value={project.title} onChange={handleChange} placeholder="Enter a name for your project" required />
          </div>
          <div>
            <label htmlFor="projectDescription">Description</label>
            <textarea id="projectDescription" name="description" value={project.description} onChange={handleChange} placeholder="Enter a project description" required />
          </div>
          <div>
            <label>Developers</label>
            {allDevelopers.map((dev) => (
              <label key={dev._id}>
                <input type="checkbox" checked={project.developers.includes(dev._id)} onChange={() => handleDeveloperSelection(dev._id)} />
                {dev.Fname}
              </label>
            ))}
          </div>
          <div>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectEdit;
