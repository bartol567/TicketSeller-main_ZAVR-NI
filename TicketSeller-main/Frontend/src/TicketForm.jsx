import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TicketForm({ occasionId, onTicketCreated }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    oib: '',
    homeAddress: '',
    city: '',
    seatNumber: '',
    seated: false,
    userId: null,
    occasionId: occasionId
  });

  // Update occasionId in the form data when it changes
  useEffect(() => {
    setFormData(prev => ({ ...prev, occasionId }));
  }, [occasionId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create User
    axios.post('https://localhost:7205/api/Users', {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      oib: formData.oib,
      homeAddress: formData.homeAddress,
      city: formData.city,
      registrationDate: new Date().toISOString()
    }).then(response => {
      // User created successfully, now create ticket
      const userId = response.data.id;
      return axios.post('https://localhost:7205/api/Tickets', {
        userId: userId,
        occasionId: formData.occasionId,
        seat: formData.seatNumber,
        seated: formData.seated
      });
    }).then((response) => {
      alert('Ticket and user created successfully!');
      onTicketCreated(response.data);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        oib: '',
        homeAddress: '',
        city: '',
        seatNumber: '',
        seated: false,
        userId: null,
        occasionId: occasionId
      });
    }).catch(error => {
      console.error('Error creating user or ticket', error);
      alert('Failed to create user or ticket.');
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Ticket and User</h2>
      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input type="text" name="oib" value={formData.oib} onChange={handleChange} placeholder="OIB" required />
      <input type="text" name="homeAddress" value={formData.homeAddress} onChange={handleChange} placeholder="Home Address" />
      <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
      <input type="number" name="seatNumber" value={formData.seatNumber} onChange={handleChange} placeholder="Seat Number" required />
      <label>
        <input type="checkbox" name="seated" checked={formData.seated} onChange={handleChange} />
        Seated
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default TicketForm;
