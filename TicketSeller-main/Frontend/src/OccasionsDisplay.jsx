import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OccasionsDisplay({ categoryId }) {
  const [occasions, setOccasions] = useState([]);

  useEffect(() => {
    axios.get(`https://localhost:7205/api/Occasions/by-category/${categoryId}`)
      .then(response => setOccasions(response.data))
      .catch(error => console.error('Error fetching occasions', error));
  }, [categoryId]);

  return (
    <ul>
      {occasions.map((occasion) => (
        <li key={occasion.id}>
          {occasion.occasionName} at {occasion.occasionPlace} on {new Date(occasion.startTime).toLocaleDateString()}
        </li>
      ))}
    </ul>
  );
}

export default OccasionsDisplay;
