
  import React, { useState } from 'react';
import CategorySelector from './CategorySelector';
import OccasionsSelector from './OccasionsSelector';
import TicketForm from './TicketForm';
import TicketDisplay from './TicketDisplay';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CategoriesPage from './CategoriesPage';
import OccasionsDisplay from './OccasionsDisplay';
import TicketsManager from './TicketsManager';
import UsersManager from './UsersManager';


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
    // <div>
    //   <CategorySelector onCategorySelect={setSelectedCategory} />
    //   {selectedCategory && (
    //     <OccasionsSelector categoryId={selectedCategory} onOccasionSelect={handleOccasionSelect} />
    //   )}
    //   {selectedOccasionId && (
    //     <TicketForm occasionId={selectedOccasionId} onTicketCreated={handleTicketCreation} />
    //   )}
    //   {ticketInfo && <TicketDisplay ticketInfo={ticketInfo} />}
    // </div>
    <Router>
    <div>
      <header>
        <h1>Ticket Seller</h1>
      </header>
      <Routes> {/* Updated from Switch to Routes */}
          <Route path="/" element={
            <>
              <Link to="/occasions">
                <button type="button">View All Occasions</button>
              </Link>
              <CategorySelector onCategorySelect={setSelectedCategory} />
              <Link to="/categories">
                <button type="button">View All Categories</button>
              </Link>
              {selectedCategory && (
                <OccasionsSelector categoryId={selectedCategory} onOccasionSelect={handleOccasionSelect} />
              )}
              {selectedOccasionId && (
                <TicketForm occasionId={selectedOccasionId} onTicketCreated={handleTicketCreation} />
              )}
              <Link to="/tickets">
                <button type="button">View All Tickets</button>
              </Link>
              <Link to="/users">
                <button>Manage Users</button>
              </Link>
            </>
          } />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/occasions" element={<OccasionsDisplay />} />
          <Route path="/tickets" element={<TicketsManager />} />
          <Route path="/users" element={<UsersManager />} />
          
        </Routes>
    </div>
  </Router>
  );
}

export default App;
