import React from "react";
import { Link } from "react-router-dom";
import "./css/ProjectList.css";

import deleteIcon from "./delete.png";
import editIcon from "./edit.png";

class ProjectList extends React.Component {
  // Method to render task status counts
  renderTaskStatusCounts(taskStatusCounts) {
    if (!taskStatusCounts || taskStatusCounts.length === 0) {
      return <p>No task status data available</p>;
    }

    return taskStatusCounts.map((statusCount) => (
        <p key={statusCount._id}>{`${statusCount._id}: ${statusCount.count}`}</p>
    ));
  }

  render() {
    const { projects, onDelete, onEdit, userRole } = this.props;

    return (
        <div className="project-list">
          {projects.map((project) => (
              <Link key={project._id} to={`/projects/${project._id}/tasks`} className="project-item-link">
                <div className="project-item blackboard-background">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  {project.managerDetails && (
                      <p>Created by: {project.managerDetails.Fname + ' ' + project.managerDetails.Lname}</p>
                  )}
                  <p>Developers:</p>
                  <ul>
                    {project.developersDetails.map((dev) => (
                        <li key={dev._id}>{dev.Fname + ' ' + dev.Lname}</li>
                    ))}
                  </ul>

                  {/* Render the task status counts here */}
                  <div className="task-status-counts">
                    {this.renderTaskStatusCounts(project.taskStatusCounts)}
                  </div>

                  {userRole === "manager" && (
                      <div className="button-container">
                        <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              onDelete(project._id);
                            }}
                        >
                          <img src={deleteIcon} alt="Delete" />
                        </button>
                        <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              onEdit(project._id);
                            }}
                        >
                          <img src={editIcon} alt="Edit" />
                        </button>
                      </div>
                  )}
                </div>
              </Link>
          ))}
        </div>
    );
  }
}

export default ProjectList;
