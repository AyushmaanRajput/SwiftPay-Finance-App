import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const NotificationCard = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  box-shadow: 0px 2px 4px rgba(237, 236, 236, 0.1);
  color: var(--primary-white);
  cursor: pointer;
  transition: all 0.2s ease;
  `;

const NotificationAvatar = styled.div`
  width: 60px;
  height: 60px;
  background-color: var(--primary);
  color: var(--text-heading);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 10px;
  font-size: larger;
  font-weight: bold;
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationDate = styled.p`
  color: #888;
  font-size: 0.8em;
`;

const NotificationDetails = styled.div`
  margin-top: 10px;
  border-top: 1px solid #ccc;
  padding-top: 10px;
`;

export const Notifications = () => {
  const [notifications, setUserNotifications] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [filter, setFilter] = useState('all'); 
  const [sortedNotifications, setSortedNotifications] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');


  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null); 
    } else {
      setExpandedIndex(index);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  useEffect(() => {
    axios
      .get('https://warlike-current.onrender.com/users')
      .then((response) => {
        const firstUser = response.data[0];
        setUserNotifications(firstUser.notifications);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
      const sorted = [...notifications].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setSortedNotifications(sorted);
  }, [notifications, sortOrder]);

  const filteredNotifications = sortedNotifications.filter((notification) => {
    if (filter === 'received') {
      return notification.amount > 0;
    } else if (filter === 'sent') {
      return notification.amount < 0;
    }
    return true; 
  });

  return (
    <div>
        <div>
            <label>
            Filter:
            <select onChange={(e) => setFilter(e.target.value)} style={{backgroundColor:`var(--primary)`,marginRight:"35px", border:"none",padding :"5px 7px", borderRadius:"15px"}}>
                <option value="all">All</option>
                <option value="received">Received</option>
                <option value="sent">Sent</option>
            </select>
            </label>
            <button onClick={toggleSortOrder} style={{backgroundColor:`var(--primary)`,marginLeft:"35px",padding :"5px 7px", borderRadius:"15px"}}>
            {sortOrder === 'asc' ? 'Latest First' : 'Oldest First'}
            </button>
      </div>
      {filteredNotifications.length > 0 &&
        filteredNotifications.map((notification, index) => ( 
          <NotificationCard
            className={expandedIndex === index ? 'expanded' : ''}
            onClick={() => toggleExpand(index)}
            key={index}
          >
            <NotificationAvatar>
            {
              notification.from === 'John Doe'
                  ? `${notification.to[0]}`
                  : `${notification.from[0]}`
            }
              
            </NotificationAvatar>
            <NotificationContent>
              <h3>
                {notification.from === 'John Doe'
                  ? notification.to
                  : notification.from}
              </h3>
              <NotificationDate>
                {new Date(notification.date).toLocaleString()}
              </NotificationDate>
              {expandedIndex === index && (
                <NotificationDetails>
                  <p>{notification.message}</p>
                  <p>
                    {notification.amount > 0
                      ? `Received: $${notification.amount}`
                      : `Sent: $${Math.abs(notification.amount)}`}
                  </p>
                </NotificationDetails>
              )}
            </NotificationContent>
            <div
              style={{
                backgroundColor: `var(--gradient1)`,
                color: 'black',
                padding: '5px',
                borderRadius: '5px',
                marginLeft: 'auto',
              }}
            >
              {notification.amount > 0 ? 'Received' : 'Sent'}
            </div>
          </NotificationCard>
        ))}
    </div>
  );
};
