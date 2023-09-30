import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";

const NotificationCard = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  box-shadow: 0px 2px 4px rgba(13, 12, 12, 0.1);
  color: var(--primary-white);
  background-color: var(--gradient1);
  cursor: pointer;
  // transition: all 0.2s ease;
`;

const MainCard = styled.div`
  width: 25rem;
  position: absolute;
  top: 10%;
  right: 5%;
  padding: 1rem;
  transition-property: 63px;
  background-color: var(--background-light);
  border-radius: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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

const NotificationListContainer = styled.div`
  max-height: 500px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 3px;
  }
`;

export const Notifications = () => {
  const [notifications, setUserNotifications] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sortedNotifications, setSortedNotifications] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const mainCardRef = useRef(null);


  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    axios
      .get("https://warlike-current.onrender.com/users")
      .then((response) => {
        const firstUser = response.data[0];
        setUserNotifications(firstUser.notifications);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    }, []);
    // console.log(notifications)

  useEffect(() => {
    const sorted = [...notifications].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
    setSortedNotifications(sorted);
  }, [notifications, sortOrder]);

  const filteredNotifications = sortedNotifications.filter((notification) => {
    if (filter === "received") {
      return notification.amount > 0;
    } else if (filter === "sent") {
      return notification.amount < 0;
    }
    return true;
  });

  return (
    <MainCard ref={mainCardRef}>
      <div style={{ marginTop: "10px" }}>
        <select
          onChange={(e) => setFilter(e.target.value)}
          style={{
            backgroundColor: `var(--gradient1)`,
            marginLeft: "0px",
            border: "none",
            padding: "5px 7px",
            borderRadius: "15px",
          }}
        >
          <option value="all">All</option>
          <option value="received">Received</option>
          <option value="sent">Sent</option>
        </select>
        <button
          onClick={toggleSortOrder}
          style={{
            backgroundColor: `var(--gradient1)`,
            marginRight: "15px",
            padding: "5px 7px",
            borderRadius: "15px",
          }}
        >
          {sortOrder === "asc" ? "Latest" : "Oldest"}
        </button>
      </div>
      <NotificationListContainer>
        {filteredNotifications.length > 0 &&
          filteredNotifications.map((notification, index) => (
            <NotificationCard
              className={expandedIndex === index ? "expanded" : ""}
              onClick={() => toggleExpand(index)}
              key={index}
            >
              <NotificationAvatar>
                {notification.from === "John Doe"
                  ? `${notification.to[0]}`
                  : `${notification.from[0]}`}
              </NotificationAvatar>
              <NotificationContent>
                <h5 style={{ color: `var(--background-light)` }}>
                  {notification.from === "John Doe"
                    ? notification.to
                    : notification.from}
                </h5>
                <NotificationDate>
                  {new Date(notification.date).toLocaleString()}
                </NotificationDate>
                <NotificationDetails
                  style={{ color: `var(--background-light)` }}
                >
                  <p>{notification.message}</p>
                </NotificationDetails>
              </NotificationContent>
              <div
                style={{
                  // backgroundColor: `var(--gradient1)`,
                  color: notification.amount > 0 ? "green" : "red",
                  padding: "5px",
                  borderRadius: "5px",
                  marginLeft: "auto",
                }}
              >
                {notification.amount < 0
                  ? `${notification.amount}`
                  : `+${notification.amount}`}
              </div>
            </NotificationCard>
          ))}
      </NotificationListContainer>
    </MainCard>
  );
};
