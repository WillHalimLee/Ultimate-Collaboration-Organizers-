import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useParams, useNavigate } from 'react-router-dom';
import * as TaskService from "../services/TaskService";
import './css/CalendarView.css';

const CalendarView = () => {
    const { projectId } = useParams();
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const fetchedTasks = await TaskService.getTasksByProjectId(projectId);
                const formattedTasks = fetchedTasks.map(task => ({
                    title: task.title,
                    start: task.createdAt,
                    end: task.dueDate,
                    color: getColorByStatus(task.status),
                }));
                setTasks(formattedTasks);
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
            }
        };

        fetchTasks();
    }, [projectId]);

    const getColorByStatus = (status) => {
        switch (status) {
            case 'Pending':
                return '#FFD700';
            case 'InProgress':
                return '#1E90FF';
            case 'Completed':
                return '#32CD32';
            case 'Emergency':
                return '#FF4500';
            default:
                return '#D3D3D3';
        }
    };

return (
    <>
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={tasks}
            className="fc"
        />
        <button
            type="button"
            className="back-to-tasks-btn"
            onClick={() => navigate(`/projects/${projectId}/tasks`)}
        >
            <h2>Back to Tasks</h2>
        </button>
    </>
);
};

export default CalendarView;
