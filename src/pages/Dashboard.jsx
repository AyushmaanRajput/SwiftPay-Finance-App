import React, { useState } from "react";
import styled from "styled-components";
import { Overview } from "../components/Overview";
import { Payments } from "../components/Payments";
import { Subscriptions } from "../components/Subscriptions";
import { Transactions } from "../components/Transactions";
import { ButtonSmall } from "../components/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { LOGOUT } from "../redux/authReducer/actionTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faChartPie,
  faChartSimple,
  faClockRotateLeft,
  faCreditCard,
  faHome,
  faBell,
  faSquarePollVertical,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import { ContainerLarge } from "../components/Layouts";
import { Formuser } from "../components/forms/Formuser";
import { Notifications } from "../components/Notifications";
import { Modal } from "../components/modals/Modal";

const DashboardContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-inline: 1rem;
  background-color: var(--background-dark);
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-block: 2rem;
  > div {
    display: flex;
    align-items: center;
  }
  > div > button {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 1rem;
    border-radius: 50%;
    background-color: var(--primary);
  }

`;

const Tabs = styled.div`
  display: flex;
  gap: 1rem;
`;

const Tab = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 50px;
  border: 1px solid var(--primary-grey);
  cursor: pointer;
  transition: all 0.15s ease-in;
  background-color: ${(props) =>
    props.selected ? "var(--primary-white)" : "transparent"};
  color: ${(props) =>
    props.selected ? "var(--text-button)" : "var(--primary-white)"};

  &:hover {
    background: var(--primary);
    color: var(--text-button);
  }
`;

const Hr = styled.hr`
  border: none;
  border-top: 1px solid var(--primary-grey);
  margin: 0;
`;

const Content = styled.div`
  flex-grow: 1;
  padding-block: 2rem;
`;
const IconDIV = styled.div`
  width: 50px;
  border-radius: 50%;

  .icon_1 {
    margin-left: 20rem;
    width: 50px;
    border-radius: 50%;
  }
`;

const Bell = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 6rem;
  border-radius: 50%;
  background-color: var(--primary);
  font-size: 1rem;
  position: absolute; 
  right: 1rem;
  top: 2rem; 
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = (isOpen) => {
    setIsModalOpen(isOpen);
  };

  const [selectedTab, setSelectedTab] = useState("overview");
  const isAuth = useSelector((store) => store.authReducer.isAuth);
  const [noti, setNotif] = useState(false);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = localStorage.getItem("loggedInUser");
  const userID = JSON.parse(userData);

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

  function logOutHandler() {
    localStorage.removeItem("loggedInUser");
    dispatch({ type: LOGOUT });
    navigate("/");
  }
  const handleButton = () => {
    if (isAuth) {
      return navigate("/form");
    }
  };

  const toggleNotifications = () => {
    console.log("Toggle Notifications Clicked");
    setNotif(!noti)
  }

  return (
    <DashboardContainer>
      <TopBar>
        <div>
          <button>
            <FontAwesomeIcon
              icon={faHome}
              className="icon"
              color="var(--background-dark)"
              onClick={() => navigate("/")}
            />
          </button>
          <Tabs>
            <Tab
              selected={selectedTab === "overview"}
              onClick={() => handleTabClick("overview")}
            >
              Overview
              <FontAwesomeIcon
                icon={faChartSimple}
                style={{
                  marginLeft: "0.5em",
                  fontSize: "1rem",
                  color: "var(--background-light)",
                }}
              ></FontAwesomeIcon>
            </Tab>
            <Tab
              selected={selectedTab === "payments"}
              onClick={() => handleTabClick("payments")}
            >
              Payments
              <FontAwesomeIcon
                icon={faCreditCard}
                style={{
                  marginLeft: "0.5em",
                  fontSize: "1rem",
                }}
              ></FontAwesomeIcon>
            </Tab>
            <Tab
              selected={selectedTab === "subscriptions"}
              onClick={() => handleTabClick("subscriptions")}
            >
              Subscriptions
              <FontAwesomeIcon
                icon={faTv}
                style={{
                  marginLeft: "0.5em",
                  fontSize: "1rem",
                }}
              ></FontAwesomeIcon>
            </Tab>
            <Tab
              selected={selectedTab === "transactions"}
              onClick={() => handleTabClick("transactions")}
            >
              Transactions
              <FontAwesomeIcon
                icon={faClockRotateLeft}
                style={{
                  marginLeft: "0.5em",
                  fontSize: "1rem",
                }}
              ></FontAwesomeIcon>
            </Tab>
          </Tabs>
        </div>
        <div>
        <IconDIV className="user-icons">
          <img
            src={avatars[userID.avatarNum - 1]}
            onClick={handleButton}
            className="icon_1"
          />
        </IconDIV>
        <Bell className="bell">
            <FontAwesomeIcon
              icon={faBell}
              className="icon"
              color="var(--background-dark)"
              onClick={toggleNotifications}
            />
          </Bell>
        <ButtonSmall onClick={logOutHandler}>Logout</ButtonSmall>
       </div>
      </TopBar>
      <Hr />
      <Content>
        {selectedTab === "overview" && <Overview />}
        {selectedTab === "payments" && <Payments />}
        {selectedTab === "subscriptions" && <Subscriptions />}
        {selectedTab === "transactions" && <Transactions />}
        {noti && <Notifications />}
      </Content>
    </DashboardContainer>
  );
};
