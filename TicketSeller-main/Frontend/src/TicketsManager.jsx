// TicketsManager.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TicketsManager() {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = () => {
    axios.get('https://wipeout-001-site1.gtempurl.com/api/Tickets')
      .then(response => {
        setTickets(response.data);
      })
      .catch(error => {
        console.error('Error fetching tickets:', error);
      });
  };

  const deleteTicket = (ticketId) => {
    axios.delete(`https://wipeout-001-site1.gtempurl.com/api/Tickets/${ticketId}`)
      .then(response => {
        // Refresh the list of tickets or remove the ticket from the state
        setTickets(tickets.filter(ticket => ticket.id !== ticketId));
      })
      .catch(error => {
        console.error('Error deleting ticket:', error);
      });
  };

  // Placeholder for form inputs or a separate form component to add tickets
  // For now, it's just a button to simulate adding a ticket
  return (
    <div>
      <h2>Tickets Manager</h2>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket.id}>
            {ticket.occasion.occasionName} - {ticket.occasion.startTime} - {ticket.user.firstName} {ticket.user.lastName} {'  '}{'  '}{'  '}
            <button onClick={() => deleteTicket(ticket.id)}> 
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/')}>Return to Front Page</button>
    </div>
  );
}

export default TicketsManager;
