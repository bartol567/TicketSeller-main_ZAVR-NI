// OccasionsDisplay.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewOccasionForm from './NewOccasionForm';
import { useNavigate } from 'react-router-dom';

function OccasionsDisplay() {
    const [categories, setCategories] = useState([]);
  const [occasionsByCategory, setOccasionsByCategory] = useState({});
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Replace with your actual API endpoint for fetching occasions
    axios.get('https://localhost:7205/api/Occasions')
      .then(response => {
        // Assuming your occasions come in an array and each has a category property
        const grouped = response.data.reduce((acc, occasion) => {
          // Group occasions by category
          acc[occasion.occasionCategory.categoryName] = acc[occasion.occasionCategory.categoryName] || [];
          acc[occasion.occasionCategory.categoryName].push(occasion);
          return acc;
        }, {});
        
        setOccasionsByCategory(grouped);
      })
      .catch(error => {
        console.error('There was an error fetching the occasions', error);
      });

      axios.get('https://localhost:7205/api/OccasionCategories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the categories', error);
      });      
  }, []);

  const onNewOccasionAdded = (newOccasion) => {
    setOccasionsByCategory(prevOccasions => {
      // Find the category name of the new occasion
      const categoryName = categories.find(category => category.id === newOccasion.occasionCategoryId)?.categoryName;
      // Ensure that a category name is found; otherwise, use a fallback value
      const safeCategoryName = categoryName || 'Other';
  
      const updatedOccasions = { ...prevOccasions };
      if (updatedOccasions[safeCategoryName]) {
        updatedOccasions[safeCategoryName].push(newOccasion);
      } else {
        // If the category does not exist, create it and add the new occasion
        updatedOccasions[safeCategoryName] = [newOccasion];
      }
      return updatedOccasions;
    });
  };

  return (
    <div>
      <h2>All Occasions</h2>
      {Object.entries(occasionsByCategory).map(([categoryName, occasions]) => (
        <div key={categoryName}>
          <h3>{categoryName}</h3>
          <ul>
            {occasions.map(occasion => (
              <li key={occasion.id}>{occasion.occasionName} - {occasion.startTime}</li>
            ))}
          </ul>
        </div>
      ))}
      <button onClick={() => setShowForm(!showForm)}>Add New Occasion</button>
      {showForm && (
        <NewOccasionForm categories={categories} onNewOccasionAdded={onNewOccasionAdded} />
      )}
      <button onClick={() => navigate('/')}>Return to Front Page</button>
    </div>
  );
}

export default OccasionsDisplay;
