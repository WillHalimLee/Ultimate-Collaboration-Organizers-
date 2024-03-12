import React, { useEffect, useState } from "react";
import "./css/UserInformation.css";
import * as userService from "../services/userService";
import { Link } from "react-router-dom";

const UserInformation = ({ onClose, onSave }) => {
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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userString = localStorage.getItem("user");
        if (userString) {
          const userId = JSON.parse(userString);
          const userResponse = await userService.getUserById(userId);

          // Validate and format date of birth if present
          if (userResponse.dob) {
            const dobDate = new Date(userResponse.dob);
            if (!isNaN(dobDate.getTime())) {
              userResponse.dob = dobDate.toISOString().split("T")[0];
            } else {
              console.error("Invalid date received from backend:", userResponse.dob);
            }
          }

          setUserDetails({ ...userResponse });
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const registeredUser = await userService.handleUpdate(userDetails._id, userDetails);
      localStorage.setItem("user", JSON.stringify(registeredUser._id));
      onSave?.();
    } catch (error) {
      console.error("Error saving user information:", error);
    }
  };

  return (
    <div className="user-information-container">
      <h2 className="user-information-title">User Information</h2>
      <form className="user-information-form" onSubmit={handleSave}>
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
        <br />
        <button type="submit" className="user-information-save-button">
          Save
        </button>
      </form>

      <div className="user-information-back-link">
        <Link to="/app" className="button-create-project" style={{ textDecoration: "none" }}>
          Back to Projects
        </Link>
      </div>
    </div>
  );
};

export default UserInformation;