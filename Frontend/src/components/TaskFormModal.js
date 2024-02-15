import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';

import * as taskService from "../services/TaskService";




const TaskFormModal = ({ isOpen, onClose, projectId, fetchTasks }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Pending');
    const [dueDate, setDueDate] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await taskService.createTask({
                title,
                description,
                status,
                dueDate,
                projectId,
            });
            fetchTasks();
            onClose();
        } catch (error) {
            if (error.response) {
                console.error('Error data:', error.response.data);
                console.error('Error status:', error.response.status);
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
        }



    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Task Form">
            <h2>Add New Task</h2>
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

export default TaskFormModal;
