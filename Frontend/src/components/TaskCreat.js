import React, {useState} from 'react';

import * as taskService from "../services/TaskService";




const TaskCreat = ({ isOpen, onClose, projectId, fetchTasks }) => {
    const [Tasks, setTasks] = useState({title: '', description: '' ,status:'',dueDate:'',projectId:projectId});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTasks((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await taskService.createTask(Tasks);
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
        <div className="modal-overlay">
            <div className="modal-body">
            <h2>Add New Task</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Enter a name for your Task"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Enter a Task description"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="status">Status</label>
                    <select id="status"  name="status" onChange={handleChange}>
                        <option value="Pending">Pending</option>
                        <option value="InProgress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="dueDate">Due Date</label>
                    <input
                        id="dueDate"
                        name="dueDate"
                        type="date"

                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Save Task</button>
                <button type="button" onClick={onClose}>Cancel</button>

            </form>
            </div>
        </div>
    );
};

export default TaskCreat;
