import React, { useState, useEffect } from "react";
import TaskCreat from "./TaskCreat";
import { useParams, Link } from "react-router-dom";
import TaskList from "./TaskList";
import * as TaskService from "../services/TaskService";
import TaskEdit from "./TaskEdit";
import "./css/TaskBoard.css";
import * as UserService from "../services/userService";

const TaskBoard = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isEditComponentOpen, setIsEditComponentOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const refreshTasks = async () => {
    try {
      const fetchedTasks = await TaskService.getTasksByProjectId(projectId);
      console.log("fetchedTasks", fetchedTasks);
      // Assuming tasks already contain necessary details
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    refreshTasks();
  }, [projectId]);

  const handleAddTaskClick = () => {
    setIsTaskModalOpen(true);
  };

  const handleOpenEditComponent = (task) => {
    setEditingProject(task);
    setIsEditComponentOpen(true);
  };

  // Function to filter tasks by status
  const filterTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
      <div className="TaskBoard">
        <h2 className="TaskBoardTitle">Task Board</h2>
        <button className="AddTaskButton" onClick={handleAddTaskClick}>
          Add New Task
        </button>

        <div className="task-status-columns">
          {['Pending', 'InProgress', 'Completed', 'Emergency'].map((status) => (
              <div key={status} className="task-status-column">
                <h3>{status}</h3>
                <TaskList
                    tasks={filterTasksByStatus(status) || []}
                    onDelete={refreshTasks}
                    onEdit={handleOpenEditComponent}
                />
              </div>
          ))}
        </div>

        {isTaskModalOpen && (
            <TaskCreat
                isOpen={isTaskModalOpen}
                onClose={() => setIsTaskModalOpen(false)}
                projectId={projectId}
                fetchTasks={refreshTasks}
            />
        )}
        {isEditComponentOpen && (
            <TaskEdit
                isOpen={isEditComponentOpen}
                onClose={() => setIsEditComponentOpen(false)}
                fetchTasks={refreshTasks}
                TaskID={editingProject}
            />
        )}

        <div style={{ marginTop: "20px" }}>
          <Link to="/app" className="button-create-project" style={{ textDecoration: "none" }}>
            Back to Projects
          </Link>
        </div>
      </div>
  );
};

export default TaskBoard;
