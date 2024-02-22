import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as userService from "./services/userService";


const Login = () => {
    const [user, setUser] = useState({ email: '',password:'',});

    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await userService.login(user);

            navigate('/app');
        } catch (err) {
            setError('Login failed. Please try again later.');
        }
    };

    const handleManagerLogin = async (event) => {
        navigate('/app');
        event.preventDefault();

        try {
            // Simulate manager login
            //await userService.register({Fname: 't1', Lname: 't2', phone: '4255998422', email: 'manager@example.com',password:'manager123', address: '12345', dob: '08-18-2003', job: 'manager' });
            const managerCredentials = { email: 'manager@example.com', password: 'manager123' };
            await userService.login(managerCredentials);
            //console.log('Manager login response:', response.token);
            navigate('/app');
        } catch (err) {
            setError('Login failed. Please try again later.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email"  placeholder="enter email" onChange={handleChange} required/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" placeholder="enter password" onChange={handleChange} required/>
                </div>
                <button type="submit">Login</button>
                <button onClick={handleManagerLogin}>Login as Manager</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default Login;
