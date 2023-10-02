import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { ButtonOutline } from "./Buttons";
import { useSelector } from "react-redux";
const avatars = [
  "/avatars/Asian Man.png",
  "/avatars/Black Lady.png",
  "/avatars/Black Man.png",
  "/avatars/College Student.png",
  "/avatars/Indian Man.png",
  "/avatars/Middle Eastern Lady.png",
  "/avatars/Old Man.png",
  "/avatars/Western Man.png",
  "/avatars/White Lady.png",
  "/avatars/Young Lady.png",
];

const userAvatarNames = {
  "John Doe": 8,
  "Jane Smith": 7,
  "Alice Johnson": 10,
  "Bob Brown": 3,
  "Charlie Brown": 4,
};

const MainCard = styled.div`
  width: 28rem;
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
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    color: var(--primary-grey);
    background-color: transparent;
    border-radius: 3px;
  }
`;

const NotificationCard = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid var(--primary-grey);
  padding: 0.5rem;
  color: var(--primary-grey);
  cursor: pointer;
  transition: all 0.1s ease-in;
  border-radius: 0.25rem;
  &:hover {
    background-color: var(--primary-light);
    color: var(--background-light);
  }
`;
const NotificationAvatar = styled.div`
  width: 3rem;
  height: 3rem;
  overflow:hidden;
  background-color: var(--primary-white);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 0.75rem;
`;

const NotificationContent = styled.div`
  flex: 1;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  font-size: var(--link);
  .personal {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const NotificationDate = styled.p`
  font-size: 0.8em;
`;

const NotificationDetails = styled.div``;

export const Notifications = () => {
  const [notifications, setUserNotifications] = useState(
    useSelector((store) => store.authReducer.loggedInUser.notifications) || []
  );
  const user = useSelector((store) => store.authReducer.loggedInUser);
  const users = useSelector((store) => store.usersReducer.users);
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

  for (let i = 0; i < filteredNotifications.length; i++) {
    if(filteredNotifications[i].to==user.name){
      filteredNotifications[i].avatarNum=userAvatarNames[filteredNotifications[i].from];
    }else{
      filteredNotifications[i].avatarNum=userAvatarNames[filteredNotifications[i].to];
    }
  }
  console.log(filteredNotifications);

  return (
    <MainCard ref={mainCardRef}>
      <div className="notification-filter">
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
                <img src={avatars[notification.avatarNum-1]}/>
              </NotificationAvatar>
              <NotificationContent>
                <div className="personal">
                  <h5>
                    {notification.from === "John Doe"
                      ? notification.to
                      : notification.from}
                  </h5>
                  <NotificationDate>
                    {new Date(notification.date).toLocaleString()}
                  </NotificationDate>
                </div>
                <NotificationDetails>
                  <p>{notification.message}</p>
                </NotificationDetails>
              </NotificationContent>
              <div
                style={{
                  // backgroundColor: `var(--gradient1)`,
                  color:
                    notification.amount > 0
                      ? "green"
                      : "var(--complementary-light)",
                }}
              >
                {notification.amount < 0
                  ? `-$${Math.abs(notification.amount)}`
                  : `+$${notification.amount}`}
              </div>
            </NotificationCard>
          ))}
      </NotificationListContainer>
    </MainCard>
  );
};
