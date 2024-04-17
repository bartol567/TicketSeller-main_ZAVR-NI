
  import React, { useState } from 'react';
import CategorySelector from './CategorySelector';
import OccasionsDisplay from './OccasionsDisplay';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div>
      <h1>Ticket Seller</h1>
      <CategorySelector onCategorySelect={setSelectedCategory} />
      {selectedCategory && <OccasionsDisplay categoryId={selectedCategory} />}
    </div>
  );
}

export default App;
