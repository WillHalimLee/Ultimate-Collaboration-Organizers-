import React, { useState, useEffect } from "react";
import TaskCreat from "./TaskCreat";
import { useParams, Link } from "react-router-dom";
import TaskList from "./TaskList";
import * as TaskService from "../services/TaskService";
import TaskEdit from "./TaskEdit";
import "./css/TaskBoard.css";
import { useNavigate } from "react-router-dom";
import calendarIcon from './calendar.png';
import addTaskIcon from './taskAdd.png';
import taskReportIcon from './report.png';
import backToProjectsIcon from './return.png';

const TaskBoard = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isEditComponentOpen, setIsEditComponentOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [tasksReport, setTasksReport] = useState({});
  const [isTasksReportVisible, setIsTasksReportVisible] = useState(false);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const refreshTasks = async () => {
    try {
      const fetchedTasks = await TaskService.getTasksByProjectId(projectId);
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    const fetchTasksReport = async () => {
      try {
        const report = await TaskService.getTasksReportByProjectId(projectId);
        const reportObject = report.reduce((acc, current) => {
          acc[current._id] = current.count;
          return acc;
        }, {});
        setTasksReport(reportObject);
      } catch (error) {
        console.error('Failed to fetch tasks report:', error);
      }
    };

    fetchTasksReport();
    refreshTasks();
  }, [projectId]);

  const handleAddTaskClick = () => {
    setIsTaskModalOpen(true);
  };

  const handleOpenEditComponent = (taskId) => {
    console.log("Editing task:", taskId);
    setEditingTask(taskId);
    setIsEditComponentOpen(true);
  };

  const filterTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  async function deleteTask(taskId) {
    try {
      await TaskService.deleteTask(taskId);
      refreshTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleTaskReportClick = () => {
    setIsTasksReportVisible(!isTasksReportVisible);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="website-name">UCO</div>
        <div className="menu-icon" onClick={handleToggleMenu}>
          ☰
        </div>

        {isMenuOpen && (
          <div className="dropdown-menu">
            <button className="menu-item" onClick={() => navigate(`/weekly-view/${projectId}`)}>
              <img src={calendarIcon} alt="Calendar View" className="icon" />
            </button>
            <button className="menu-item" onClick={handleAddTaskClick}>
              <img src={addTaskIcon} alt="Add New Task" className="icon" />
            </button>
            <button className="menu-item" onClick={handleTaskReportClick}>
              <img src={taskReportIcon} alt="Task Report" className="icon" />
            </button>
            <Link to="/app" className="menu-item">
              <img src={backToProjectsIcon} alt="Back to Projects" className="icon" />
            </Link>
          </div>
        )}
      </header>

      <main className="task-board-main">
        <div className="center-title">
          <h2 className="task-board-title">Task Board</h2>
        </div>
        <div className="task-status-columns">
          {['Pending', 'InProgress', 'Completed', 'Emergency'].map((status) => (
            <div key={status} className={`task-status-column ${status.toLowerCase()}`}>
              <h3 className={`status-title ${status.toLowerCase()}`}>{status}</h3>
              <TaskList
                tasks={filterTasksByStatus(status) || []}
                onDelete={deleteTask}
                onEdit={handleOpenEditComponent}
              />
            </div>
          ))}
        </div>

        {isTasksReportVisible && (
          <div className="tasks-report visible">
            <h4>Tasks Report</h4>
            <p>Pending: {tasksReport.Pending || 0}</p>
            <p>In Progress: {tasksReport.InProgress || 0}</p>
            <p>Completed: {tasksReport.Completed || 0}</p>
            <p>Emergency: {tasksReport.Emergency || 0}</p>
          </div>
        )}

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
            projectId={projectId}
            fetchTasks={refreshTasks}
            TaskID={editingTask}
          />
        )}
      </main>
    </div>
  );
};

export default TaskBoard;