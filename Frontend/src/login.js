import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as userService from "./services/userService";
import "./login.css";
import imageSrc from "./task.png"; 

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
     setError(""); 
     var u = await userService.login(user);

     console.log(u);
     console.log("User logged in:", await userService.getUserById(u.ID));
     localStorage.setItem("user", JSON.stringify(u.ID));
     navigate("/app");
   } catch (err) {
     setError("Login failed. Please try again later.");

     setTimeout(() => {
       setError("");
     }, 2000);
   }
 };

  const handleManagerLogin = async (event) => {
    event.preventDefault(); 



    var u = await userService.login({
      email: "admin.test@gmail.com", password: "1234",});
    localStorage.setItem("user", JSON.stringify(u.ID));
    navigate("/app");
  };

    return (
      <div className="login-container">
        <div className="form-container-login">
          <h1 className="login-title">UCO</h1>
          <h2 className="login-subtitle">Sign In.</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <input type="email" name="email" placeholder="Email*" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <input type="password" name="password" placeholder="Password*" onChange={handleChange} required />
            </div>
         <button type="submit" className="login-button">
           Login
         </button>
            {error && <p className="error-message">{error}</p>}
            <h3 className="create-title">Don't Have An Account?</h3>
            <button onClick={() => { window.location.href = "/user-register"; }}
            className="create-button">Create One Now!
            </button>
          </form>
        </div>
        <div className="image-container">
          <img src={imageSrc} alt="task" className="login-image" />
        </div>
       <div className="copyright-container">
            <div className="copyright-content">
              @2024 Ultimate Collaboration Organization, Inc. All Rights Reserved.
            </div>
          </div>
      </div>
    );
  };

  export default Login;