import React from 'react';

function TicketDisplay({ ticketInfo }) {
  return (
    <div>
      <h2>Ticket Information</h2>
      <p>User: {ticketInfo.user.firstName} {ticketInfo.user.lastName}</p>
      <p>Email: {ticketInfo.user.email}</p>
      <p>OIB: {ticketInfo.user.oib}</p>
      <p>Address: {ticketInfo.user.homeAddress}, {ticketInfo.city}</p>
      <p>Occasion: {ticketInfo.occasion.occasionName} at {ticketInfo.occasion.occasionPlace}</p>
      <p>Date: {new Date(ticketInfo.occasion.startTime).toLocaleDateString()}</p>
      <p>Seat Number: {ticketInfo.seat}</p>
      <p>Seated: {ticketInfo.seated ? "Yes" : "No"}</p>
    </div>
  );
}

export default TicketDisplay;
