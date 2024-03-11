import React, { useState } from "react";
import "./css/UserRegister.css";
import * as userService from "../services/userService";
import { Link } from "react-router-dom";
import "./css/UserRegister.css";

const Register = ({ onClose }) => {
  const [userDetails, setUserDetails] = useState({
    Fname: "",
    Lname: "",
    phone: "",
    email: "",
    password: "",
    address: "",
    dob: "",
    job: "",
    _id: "",
  });
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
          <label>
            First Name:
            <input type="text" value={userDetails.Fname} name="Fname" onChange={handleChange} />
          </label>
          <br />
          <label>
            Last Name:
            <input type="text" value={userDetails.Lname} name="Lname" onChange={handleChange} />
          </label>
          <br />
          <label>
            Phone Number:
            <input type="number" value={userDetails.phone} name="phone" onChange={handleChange} />
          </label>
          <br />
          <label>
            Email:
            <input type="email" value={userDetails.email} name="email" onChange={handleChange} />
          </label>
          <br />
          <label>
            Password:
            <input type="password"  value={userDetails.password} name="password" onChange={handleChange} />
          </label>
          <br />
          <label>
            Address:
            <input type="text" value={userDetails.address} name="address" onChange={handleChange} />
          </label>
          <br />
          <label>
            Date of Birth:
            <input type="date" value={userDetails.dob} name="dob" onChange={handleChange} />
          </label>
          <br />
          <label>
            Job:
            <input type="text" value={userDetails.job} name="job" onChange={handleChange} />
          </label>
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
