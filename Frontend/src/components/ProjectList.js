import React from "react";
import { Link } from "react-router-dom";
import "./css/ProjectList.css";

const ProjectList = ({ projects, onDelete, onEdit, userRole }) => {
  return (
    <div className="project-list">
      {projects.map((project) => (
        <Link key={project.id} to={`/projects/${project.id}/tasks`} className="project-item-link">
          <div className="project-item">
            <h3>
              {project.title} (ID: {project.id})
            </h3>
            <p>{project.description}</p>
            {userRole === "manager" && (
              <>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onDelete(project.id);
                  }}>
                  Delete
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onEdit(project);
                  }}>
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
