// src/components/UserForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button,Typography,Paper } from '@mui/material';
import '../App.css'

const UserForm = ({ setUserDataValue }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    address: '',
    email: '',
    phone: '',
  });
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    window.onbeforeunload = isDirty ? () => true : undefined;
    return () => {
      window.onbeforeunload = null;
    };
  }, [isDirty]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setIsDirty(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = Date.now().toString();
    const newFormData = { ...formData, id: userId };
    localStorage.setItem('userData', JSON.stringify(newFormData));
    setFormData(newFormData);    
    setIsDirty(false);
    alert("User data saved")
    setUserDataValue(newFormData)
  };

  return (
    <div>
      <Paper className="user-data-section">
      <Typography variant="h5">UserDataForm</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{margin:10}}
          />
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            style={{margin:10}}
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{margin:10}}
          />
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={{margin:10}}
          />
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default UserForm;
