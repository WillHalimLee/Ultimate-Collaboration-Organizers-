import React, { useState } from 'react';
import * as userService from "../services/userService";

const Register = ({ onClose }) => { // Corrected props destructuring
    const [userDetails, setUserDetails] = useState({ name: '', email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const registeredUser = await userService.register(userDetails);
            console.log('User registered:', registeredUser);
            onClose(); // Assuming onClose is correctly passed as a function prop
        } catch (error) {
            console.error('Registration error:', error.data);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>New User</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Enter Name" onChange={handleChange} required/>
                    <input type="email" name="email" placeholder="Enter Email" onChange={handleChange} required/>
                    <input type="password" name="password" placeholder="Enter Password" onChange={handleChange}
                           required/>
                    <button type="submit">Register</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
