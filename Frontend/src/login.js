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
       var u = await userService.login(user);

      console.log(u);
      console.log("User logged in:", await userService.getUserById(u.ID));
      localStorage.setItem("user", JSON.stringify(u.ID));
      navigate("/app");
    } catch (err) {
      setError("Login failed. Please try again later.");
    }
  };

  const handleManagerLogin = async (event) => {

    
    var u = await userService.login({
      email: "admin.test@gmail.com", password: "1234",});
    localStorage.setItem("user", JSON.stringify(u.ID));
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
