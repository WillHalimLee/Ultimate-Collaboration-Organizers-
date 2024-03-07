import React from "react";
import { Link } from "react-router-dom";
import "./css/ProjectList.css";

const ProjectList = ({ projects, onDelete, onEdit, userRole }) => {
  return (
      <div className="project-list">
        {projects.map((project) => (
            <Link key={project._id} to={`/projects/${project._id}/tasks`} className="project-item-link">
                <div className="project-item">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    {project.managerDetails && <p>Created by: {project.managerDetails.Fname + ' ' + project.managerDetails.Lname}</p>}
                    <p>Developers:</p>
                    <ul>
                        {project.developersDetails.map((dev) => (
                            <li key={dev._id}>{dev.Fname + ' ' + dev.Lname}</li> // Now using the 'name' field from the developers' details
                        ))}
                    </ul>
                    {userRole === "manager" && (
                        <>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation(); // Prevent navigating to the link's href
                                    onDelete(project._id);
                                }}
                            >
                                Delete
                            </button>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation(); // Prevent navigating to the link's href
                                    onEdit(project._id);
                                }}
                            >
                                Edit
                            </button>
                        </>
                    )}
                </div>
            </Link>
        ))}
      </div>
  );
};

export default ProjectList;
