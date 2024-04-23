// UsersManager.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UsersManager() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);


  useEffect(() => {
    axios.get('https://wipeout-001-site1.gtempurl.com/api/Users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const deleteUser = (userId) => {
    axios.delete(`https://wipeout-001-site1.gtempurl.com/api/Users/${userId}`)
    .then(() => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    })
    .catch(error => console.error('Error deleting user:', error));
};

  const updateUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleUserUpdate = (event) => {
    event.preventDefault();
    const updatedUserData = {
        id: selectedUser.id,
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      oib: event.target.oib.value,
      homeAddress: event.target.homeAddress.value,
      city: event.target.city.value,
      RegistrationDate: new Date().toISOString(),
      
      

      // ... other fields ...
    };
    axios.put(`https://wipeout-001-site1.gtempurl.com/api/Users/${selectedUser.id}`, updatedUserData)
      .then(() => {
        setIsModalOpen(false);
        setUsers(prevUsers => prevUsers.map(user => user.id === selectedUser.id ? { ...user, ...updatedUserData } : user));
      })
      .catch(error => console.error('Error updating user:', error));
  };

  return (
    <div>
      <h2>User Management</h2>
      {users.map(user => (
        <div key={user.id}>
          {user.firstName} {user.lastName}
          <button onClick={() => deleteUser(user.id)}>Delete</button>
          <button onClick={() => updateUser(user)}>Update</button>
        </div>
      ))}
      {isModalOpen && selectedUser && (
        <div className="modal">
          <form onSubmit={handleUserUpdate}>
            <input type="text" name="firstName" defaultValue={selectedUser.firstName} required />
            <input type="text" name="lastName" defaultValue={selectedUser.lastName} required />
            <input type="email" name="email" defaultValue={selectedUser.email} required />
            <input type="text" name="oib" defaultValue={selectedUser.oib} required />
            <input type="text" name="homeAddress" defaultValue={selectedUser.homeAddress} required />
            <input type="text" name="city" defaultValue={selectedUser.city} required />
            {/* ... other fields ... */}
            <button type="submit">Save Changes</button>
            <button type="button" onClick={closeEditModal}>Cancel</button>
          </form>
        </div>
      )}
      <button onClick={() => navigate('/')}>Return to Front Page</button>
    </div>
  );
}

export default UsersManager;
