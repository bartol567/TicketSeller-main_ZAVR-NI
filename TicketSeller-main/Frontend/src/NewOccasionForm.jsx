// NewOccasionForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NewOccasionForm({ categories, onNewOccasionAdded }) {
  const [occasionData, setOccasionData] = useState({
    name: '',
    startTime: '',
    occasionCategoryId: '',
    occasionPlace: '',
  });
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOccasionData({ ...occasionData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://wipeout-001-site1.gtempurl.com/api/Occasions', occasionData)
      .then(response => {
        // Call a prop method to indicate that a new occasion was added
        onNewOccasionAdded({
            ...response.data,
            occasionCategory: categories.find(category => category.id === response.data.occasionCategoryId)
          });
        // Reset the form or handle the success (e.g., show a success message)
        setOccasionData({
          name: '',
          startTime: '',
          occasionCategoryId: '',
          occasionPlace: '',
        });
      })
      .catch(error => {
        console.error('There was an error adding the occasion', error);
        // Handle the error (e.g., show an error message)
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={occasionData.name}
        onChange={handleInputChange}
        placeholder="Occasion Name"
        required
      />
      <input
        type="text"
        name="occasionPlace"
        value={occasionData.occasionPlace}
        onChange={handleInputChange}
        placeholder="Occasion Place"
        required
      />
      <input
        type="datetime-local"
        name="startTime"
        value={occasionData.startTime}
        onChange={handleInputChange}
        required
      />
      <select
        name="occasionCategoryId"
        value={occasionData.occasionCategoryId}
        onChange={handleInputChange}
        required
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.categoryName}
          </option>
        ))}
      </select>
      <button type="submit">Add Occasion</button>
    </form>
  );
}

export default NewOccasionForm;
