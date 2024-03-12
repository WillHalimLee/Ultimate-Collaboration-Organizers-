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
                    start: task.createdAt, // Assuming 'createdAt' is available and in a suitable format
                    end: task.dueDate, // Ensure 'dueDate' is in the right format or transform it
                    color: getColorByStatus(task.status), // Set color based on task status
                }));
                setTasks(formattedTasks);
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
            }
        };

        fetchTasks();
    }, [projectId]);

    // Function to determine the color of a task based on its status
    const getColorByStatus = (status) => {
        switch (status) {
            case 'Pending':
                return '#FFD700'; // Gold
            case 'InProgress':
                return '#1E90FF'; // DodgerBlue
            case 'Completed':
                return '#32CD32'; // LimeGreen
            case 'Emergency':
                return '#FF4500'; // OrangeRed
            default:
                return '#D3D3D3'; // LightGray for unknown statuses
        }
    };

    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={tasks}
            />
            <button
                type="button"
                onClick={() => navigate(`/projects/${projectId}/tasks`)}
            >
                <h2>Back to Tasks</h2>
            </button>
        </>
    );
};

export default CalendarView;
