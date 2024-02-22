import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as userService from "./services/userService";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await userService.login(user);
      console.log(user);
      navigate("/app");
    } catch (err) {
      setError("Login failed. Please try again later.");
    }
  };

  const handleManagerLogin = async (event) => {
    navigate("/app");
    event.preventDefault();
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" placeholder="enter email" onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" placeholder="enter password" onChange={handleChange} required />
        </div>
        <button type="submit">Login</button>
        <button onClick={handleManagerLogin}>Login as Manager</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
