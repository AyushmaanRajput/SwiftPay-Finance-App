import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

export const Support = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('https://warlike-current.onrender.com/supports')
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const formatDateTime = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleString(); 
  };

  return (
    <StyledDiv className="support-container">
      {data.map((ticket) => (
        <div className="card" key={ticket.id}>
          <h2>Support Ticket #{ticket.id}</h2>
          <p><strong>User:</strong> {ticket.user.name}</p>
          <p><strong>Email:</strong> {ticket.user.email}</p>
          <p><strong>Transaction ID:</strong> {ticket.transactionId}</p>
          <p><strong>Subject:</strong> {ticket.subject}</p>
          <p><strong>Message:</strong> {ticket.message}</p>
          <p><strong>Status:</strong> {ticket.status}</p>
          <p><strong>Priority:</strong> {ticket.priority}</p>
          <p><strong>Created Date:</strong> {formatDateTime(ticket.createdDate)}</p>
          <button>Accept</button>
          <button>Reject</button>
        </div>
      ))}
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  color: var(--primary-white);
  text-align: left;
  font-style: var(--primary-font-family);
  div {
    border: 2px solid white;
    margin: 10px; 
    padding: 20px;
  }
  button {
    margin-right: 10px;
    padding: 3px 5px;
    text-align: center;
    background-color: var(--primary);
    font-size: var(--button);
  }
`;
