import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OccasionsDisplay({ categoryId, onOccasionSelect }) {
  const [occasions, setOccasions] = useState([]);

  useEffect(() => {
    axios.get(`http://wipeout-001-site1.gtempurl.com/api/Occasions/by-category/${categoryId}`)
      .then(response => setOccasions(response.data))
      .catch(error => console.error('Error fetching occasions', error));
  }, [categoryId]);

  return (
    <select onChange={(e) => onOccasionSelect(e.target.value)} defaultValue="">
      <option value="">Select an occasion</option>
      {occasions.map((occasion) => (
        <option key={occasion.id} value={occasion.id}>
          {occasion.occasionName} at {occasion.occasionPlace} on {new Date(occasion.startTime).toLocaleDateString()}
        </option>
      ))}
    </select>
  );
}

export default OccasionsDisplay;
