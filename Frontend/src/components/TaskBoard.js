import React, { useState, useEffect, useCallback } from "react";
import TaskCreat from "./TaskCreat";
import { useParams, Link } from "react-router-dom";
import TaskList from "./TaskList";
import * as taskService from "../services/TaskService";
import TaskEdit from "./TaskEdit";
import "./css/TaskBoard.css";
import * as UserService from "../services/userService";
import * as TaskService from "../services/TaskService";

const TaskBoard = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isEditComponentOpen, setIsEditComponentOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const refreshTasks = async () => {
    try {
      const fetchedTasks = await taskService.getTasksByProjectId(projectId);
      const tasksWithDetails = await Promise.all(fetchedTasks.map(async (task) => {
        let assignedToDetails = [];
        if (task.assignedTo && task.assignedTo.length > 0) {
          assignedToDetails = await Promise.all(
              task.assignedTo
                  .filter(userId => userId != null)
                  .map(async (userId) => {
                    const userDetails = await UserService.getUserById(userId);
                    return userDetails;
                  })
          );
        }

        let createdByDetails = null;
        if (task.createdBy) {
          try {
            createdByDetails = await UserService.getUserById(task.createdBy);
            console.log(createdByDetails.Fname);
          } catch (error) {
            console.error(`Failed to fetch creator details: ${error}`);
          }
        }

        return {
          ...task,
          assignedToDetails,
          createdByDetails,
        };
      }));

      setTasks(tasksWithDetails);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };



  useEffect(() => {
    refreshTasks();
  }, []);

  const handleAddTaskClick = () => {
    setIsTaskModalOpen(true);
  };

  const handleDeleteProject = async (taskID) => {
    try {
      await taskService.deleteTask(taskID);
      await refreshTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleOpenEditComponent = (task) => {
    setEditingProject(task);
    setIsEditComponentOpen(true);
  };

  return (
    <div className="TaskBoard">
      <h2 className="TaskBoardTitle">Task Board</h2>
      <button className="AddTaskButton" onClick={handleAddTaskClick}>
        Add New Task
      </button>
      <TaskList tasks={tasks} onDelete={handleDeleteProject} onEdit={handleOpenEditComponent}></TaskList>
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
          projectId={projectId}
          onClose={() => setIsEditComponentOpen(false)}
          fetchTasks={refreshTasks}
          TaskID={editingProject}
        />
      )}
      {/* Back to Projects Button */}
      <div style={{ marginTop: "20px" }}>
        <Link to="/app" className="button-create-project" style={{ textDecoration: "none" }}>
          Back to Projects
        </Link>
      </div>
    </div>
  );
};

export default TaskBoard;
