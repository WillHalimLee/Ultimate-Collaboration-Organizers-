import React, { useState } from 'react';
import './css/UserInformation.css';
import * as userService from "../services/userService";

const UserInformation = ({ onClose, onSave }) => {
    const [userDetails, setUserDetails] = useState({ Fname: '', Lname: '', phone: '', email: '',password:'', address: '', dob: '', job: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prev) => ({ ...prev, [name]: value }));
    };
  const handleSave = async () => {
      // Validate and save user information
      try {
          const registeredUser = await userService.register(userDetails);
          console.log('User registered:', registeredUser);
          onClose(); // Close form/modal upon successful registration
      } catch (error) {

      }
  };

  return (
  <div className="UserInformation">
      <h2>User Information</h2>
      <form onSubmit={handleSave} >
          <label>
              First Name:
              <input type="text" name='Fname' onChange={handleChange}/>
          </label>
          <br/>
          <label>
              Last Name:
              <input type="text" name="Lname" onChange={handleChange}/>
          </label>
          <br/>
          <label>
              Phone Number:
              <input type="number" name="phone" onChange={handleChange}/>
          </label>
          <br/>
          <label>
              Email:
              <input type="email" name="email" onChange={handleChange}/>
          </label>
          <br/>
          <label>
              Password:
              <input type="password" name="password" onChange={handleChange}/>
          </label>
            <br/>
          <label>
              Address:
              <input type="text" name="address" onChange={handleChange}/>
          </label>
          <br/>
          <label>
              Date of Birth:
              <input type="date" name="dob" onChange={handleChange}/>
          </label>
          <br/>
          <label>
              Job:
              <input type="text" name="job" onChange={handleChange}/>
          </label>
          <br/>
          <button type={"submit"}>Save</button>
      </form>
  </div>
  );
};

export default UserInformation;