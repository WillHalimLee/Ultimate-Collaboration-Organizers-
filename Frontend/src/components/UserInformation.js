import React, { useState } from 'react';
import './css/UserInformation.css';

const UserInformation = ({ onClose, onSave }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const handleSave = () => {
    // Validate and save user information
    const userData = {
      firstName,
      lastName,
      phoneNumber,
      email,
      address,
      dateOfBirth,
      // Add other fields as needed
    };

    // Call the onSave prop with user data
    onSave(userData);
  };

  return (
  <div className="UserInformation">
      <h2>User Information</h2>
      <label>
        First Name:
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </label>
      <br />
      <label>
        Phone Number:
        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Address:
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      </label>
      <br />
      <label>
        Date of Birth:
        <input type="text" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
      </label>
      {/* Add other fields as needed */}
      <br />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default UserInformation;