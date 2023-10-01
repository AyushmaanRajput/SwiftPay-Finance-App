import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { ButtonOutline } from "./Buttons";
import { useSelector } from "react-redux";

const MainCard = styled.div`
  width: 24rem;
  position: absolute;
  top: 10%;
  right: 5%;
  padding: 1rem;
  transition-property: 63px;
  background-color: var(--background-light);
  border-radius: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  .notification-filter {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    select {
      background-color: transparent;
      border: 1px solid var(--primary-grey);
      padding: 0.5rem 1rem;
      color: var(--primary-grey);
      border-radius: 0.25rem;
      option {
        background-color: var(--background-light);
      }
    }
  }
`;

const NotificationListContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--primary-grey);
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 3px;
  }
`;

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
  color: var(--primary-grey);
  font-size: 0.8em;
`;

const NotificationDetails = styled.div`
  margin-top: 10px;
  border-top: 1px solid #ccc;
  padding-top: 10px;
`;

export const Notifications = () => {
  const [notifications, setUserNotifications] = useState(
    useSelector((store) => store.authReducer.loggedInUser.notifications) || []
  );
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
      <div className="notification-filter" style={{ marginTop: "10px" }}>
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="received">Received</option>
          <option value="sent">Sent</option>
        </select>
        <ButtonOutline onClick={toggleSortOrder}>
          {sortOrder === "asc" ? "Latest" : "Oldest"}
        </ButtonOutline>
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
