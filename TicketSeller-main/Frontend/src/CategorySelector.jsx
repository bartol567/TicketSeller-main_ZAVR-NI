import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CategorySelector({ onCategorySelect }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7205/api/OccasionCategories')
      .then(response => {
        const items = response.data;
        setCategories(response.data)
      })
      .catch(error => console.error(error));
  }, []);
  return (
    <select onChange={(e) => onCategorySelect(e.target.value)} defaultValue="">
      <option value="" disabled>Choose a category</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.categoryName}
        </option>
      ))}
    </select>
  );
}

export default CategorySelector;
