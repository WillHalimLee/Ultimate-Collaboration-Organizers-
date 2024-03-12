import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useParams } from 'react-router-dom';
import * as TaskService from "../services/TaskService";

const CalendarView = () => {
    const { projectId } = useParams(); // Ensure this matches the route param name
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                // Adjust the method name and parameters as per your service's API
                const fetchedTasks = await TaskService.getTasksByProjectId(projectId);
                const formattedTasks = fetchedTasks.map(task => ({
                    title: task.title,
                    start: task.createdAt, // Assuming 'createdAt' is available and in a suitable format
                    end: task.dueDate, // Ensure 'dueDate' is in the right format or transform it
                    // You can add more properties as needed
                }));
                setTasks(formattedTasks);
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
            }
        };

        fetchTasks();
    }, [projectId]); // Dependency array to refetch if projectId changes

    return (
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={tasks}
        />
    );
};

export default CalendarView;
