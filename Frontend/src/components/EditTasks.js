import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import * as TasksService from "../services/TaskService";


const EditTasks = ({ isOpen, onClose, projectId, fetchTasks, TaskID}) => {
    const [Tasks, setTasks] = useState({title: '', description: '' ,status:'',dueDate:'',projectId:projectId});
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Pending');
    const [dueDate, setDueDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');


    useEffect(() => {
        const fetchTask = async () => {
            setIsLoading(true);
            try {
                const response = await TasksService.getTaskByID(projectId, TaskID);


                setTasks(response[0]);
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
            projectId
        };

        try {
            await TasksService.updateTask(projectId, TaskID, updatedTask);
            fetchTasks();
            onClose();
        } catch (error) {
            console.error("Failed to update task", error);
        }
    };


    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Task Form">
            <h2>Edit Task</h2> {}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="status">Status</label>
                    <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
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
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>
                <button type="submit">Save Task</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </Modal>
    );
};

export default EditTasks;
