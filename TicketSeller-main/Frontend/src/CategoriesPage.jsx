// CategoriesPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Replace with your actual API endpoint for fetching categories
    axios.get('https://wipeout-001-site1.gtempurl.com/api/OccasionCategories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the categories', error);
      });
  }, []);

  const handleAddCategory = () => {
    const newCategory = {
      categoryName: newCategoryName,
    };

    axios.post('https://wipeout-001-site1.gtempurl.com/api/OccasionCategories', newCategory)
      .then(response => {
        // Assuming the response includes the newly added category
        setCategories([...categories, response.data]);
        setNewCategoryName(''); // Clear the input field after submission
      })
      .catch(error => {
        alert(error.response.data);
        console.error('There was an error adding the category', error);
      });
  };

  return (
    <div>
      <h2>All Categories</h2>
      <ul>
        {categories.map(category => (
          <li key={category.id}>{category.categoryName}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newCategoryName}
          onChange={e => setNewCategoryName(e.target.value)}
          placeholder="Enter new category name"
        />
        <button onClick={handleAddCategory}>Add Category</button>
        <button onClick={() => navigate('/')}>Return to Front Page</button>
      </div>
    </div>
  );
}

export default CategoriesPage;
