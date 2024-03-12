import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/UserRegister.css";
import * as userService from "../services/userService";
import "./css/UserRegister.css";

const Register = ({ onClose }) => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    Fname: "",
    Lname: "",
    email: "",
    password: "",
    job: "",
    _id: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const registeredUser = await userService.register(userDetails);
      navigate("/");
    } catch (error) {
      setError("Failed to register. Please try again.");

      // Clear the error message after 3 seconds
      setTimeout(() => {
        setError("");
      }, 2000);

      setSuccess("");
    }
  };

  const handleRegisterClick = () => {
    setError("");
  };

  return (
    <div className="modal-overlay">
      <div className="register-container">
        <div className="form-container">
          <div className="website-name">UCO</div>
          <h3 className="centered-heading">Create your Account</h3>
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="input-container">
              <div className="name-container">
                <div className="name-input">
                  <label className="form-label">
                    First Name:
                    <input type="text" value={userDetails.Fname} name="Fname" onChange={handleChange} className="form-input" />
                  </label>
                </div>
                <div className="name-input">
                  <label className="form-label">
                    Last Name:
                    <input type="text" value={userDetails.Lname} name="Lname" onChange={handleChange} className="form-input" />
                  </label>
                </div>
              </div>
              <div className="single-input">
                <label className="form-label">
                  Email:
                  <input type="email" value={userDetails.email} name="email" onChange={handleChange} className="form-input" />
                </label>
              </div>
              <div className="single-input">
                <label className="form-label">
                  Password:
                  <input type="password" value={userDetails.password} name="password" onChange={handleChange} className="form-input" />
                </label>
              </div>
              <div className="single-input">
                <label>
                  Job:
                  <select
                      value={userDetails.job}
                      name="job"
                      onChange={handleChange}
                      className="form-input"
                  >
                    <option value="">Select a job</option>
                    <option value="manager">Manager</option>
                    <option value="developer">Developer</option>
                  </select>
                </label>
              </div>
            </div>
            <button type="submit" className="form-button" onClick={handleRegisterClick}></button>
            <button
                type="button"
                onClick={() => {
                  navigate("/");
                }}
                className="form-button cancel"></button>
          </form>
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
        </div>
      </div>
    </div>
  );
};

export default Register;
