
  import React, { useState } from 'react';
import CategorySelector from './CategorySelector';
import OccasionsDisplay from './OccasionsDisplay';
import TicketForm from './TicketForm';
import TicketDisplay from './TicketDisplay';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedOccasionId, setSelectedOccasionId] = useState(null);
  const [ticketInfo, setTicketInfo] = useState(null);

  const handleOccasionSelect = (occasionId) => {
    setSelectedOccasionId(occasionId);
  };

  const handleTicketCreation = (ticketData) => {
    setTicketInfo(ticketData); // Update state when ticket is created
  };

  return (
    <div>
      <h1>Ticket Seller</h1>
      <CategorySelector onCategorySelect={setSelectedCategory} />
      {selectedCategory && (
        <OccasionsDisplay categoryId={selectedCategory} onOccasionSelect={handleOccasionSelect} />
      )}
      {selectedOccasionId && (
        <TicketForm occasionId={selectedOccasionId} onTicketCreated={handleTicketCreation} />
      )}
      {ticketInfo && <TicketDisplay ticketInfo={ticketInfo} />}
    </div>
  );
}

export default App;
