import React, {useEffect, useState} from 'react';
import Modal from 'react-modal'; // Assuming you're using react-modal for modals

import * as TasksService from "../services/TaskService";




// Make sure to call Modal.setAppElement('#yourAppElement') somewhere in your app

const EditTasks = ({ isOpen, onClose, projectId, fetchTasks, TaskID}) => {
    const [Tasks, setTasks] = useState({title: '', description: '' ,status:'',dueDate:'',projectId:projectId});
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Pending'); // Default status, adjust as necessary
    const [dueDate, setDueDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');


    useEffect(() => {
        const fetchTask = async () => {
            setIsLoading(true);
            try {
                const response = await TasksService.getTaskByID(projectId, TaskID);


                setTasks(response[0]);
                // Assuming response.data has the correct structure
                setTitle(response[0].title);
                setDescription(response[0].description);
                setStatus(response[0].status);
                setDueDate(response[0].dueDate);
                
            } catch (err) {
                setError('Failed to fetch task data.');
            } finally {
                setIsLoading(false);
            }
        };

        if (TaskID) {
            fetchTask();
        }
    }, [TaskID, projectId]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!projectId) {
            console.error("Project ID is undefined");
            return;
        }

        const updatedTask = {
            title,
            description,
            status,
            dueDate,
            projectId // Ensure this is the correct format expected by your backend
        };

        try {
            await TasksService.updateTask(projectId, TaskID, updatedTask);
            fetchTasks(); // Refresh the task list
            onClose(); // Close the modal
        } catch (error) {
            console.error("Failed to update task", error);
        }
    };


    // Correct the onChange handlers
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Task Form">
            <h2>Edit Task</h2> {/* Change the heading to reflect the action accurately */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} // Corrected to setTitle
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} // Already correct
                    />
                </div>
                <div>
                    <label htmlFor="status">Status</label>
                    <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}> // Corrected to setStatus
                        <option value="Pending">Pending</option>
                        <option value="InProgress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="dueDate">Due Date</label>
                    <input
                        id="dueDate"
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)} // Corrected to setDueDate
                    />
                </div>
                <button type="submit">Save Task</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </Modal>
    );
};

export default EditTasks;
