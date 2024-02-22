import React, { useState } from "react";
import * as userService from "../services/userService";

const Register = ({ onClose }) => {
  const [userDetails, setUserDetails] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(""); // State for storing registration errors
  const [success, setSuccess] = useState(""); // State for a successful registration message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
    // Reset error messages on input change
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const registeredUser = await userService.register(userDetails);
      console.log("User registered:", registeredUser);
      setSuccess("Registration successful!"); // Set success message
      setError(""); // Clear any previous errors
      onClose(); // Close form/modal upon successful registration
    } catch (error) {
      setError("Failed to register. Please try again."); // Set error message
      setSuccess(""); // Clear any previous success message
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-body">
        <h2>New User</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Enter Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Enter Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Enter Password" onChange={handleChange} required />
          <button type="submit">Register</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
      </div>
    </div>
  );
};

export default Register;
