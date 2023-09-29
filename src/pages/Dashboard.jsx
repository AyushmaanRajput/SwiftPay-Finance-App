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
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Formuser } from "../components/forms/Formuser";
import { Notifications } from "../components/Notifications";


const DashboardContainer = styled.div`
  display: flex;
  background-color: var(--background-dark);
  min-height: 100vh;
`;

const TabContainer = styled.div`
  width: 20%;
  background-color: var(--background-light);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  button {
    align-self: center;
    margin-block: 1rem;
  }
`;

const Tabs = styled.div`
  display: flex;
  flex-direction: column;
`;

const Tab = styled.div`
  padding: 10px;
  cursor: pointer;
  background-color: ${(props) =>
    props.selected ? "var(--primary)" : "transparent"};
  color: ${(props) =>
    props.selected ? "var(--text-button)" : "var(--primary-white)"};

  &:hover {
    background: rgb(182, 246, 207);
    background-image: linear-gradient(
      90deg,
      rgba(182, 246, 207, 1) 0%,
      rgba(236, 246, 190, 1) 100%
    );
    color: var(--text-button);
  }
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

export const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const isAuth = useSelector((store) => store.authReducer.isAuth);
  console.log(isAuth, "alisha");
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <DashboardContainer>
      <TabContainer>
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
          </Tab>
          <Tab
            selected={selectedTab === "payments"}
            onClick={() => handleTabClick("payments")}
          >
            Payments
          </Tab>
          <Tab
            selected={selectedTab === "subscriptions"}
            onClick={() => handleTabClick("subscriptions")}
          >
            Subscriptions
          </Tab>
          <Tab
            selected={selectedTab === "transactions"}
            onClick={() => handleTabClick("transactions")}
          >
            Transactions
          </Tab>
          <Tab
            selected={selectedTab === "notifications"}
            onClick={() => handleTabClick("notifications")}
          >
            Notifications
          </Tab>
        </Tabs>
        <ButtonSmall onClick={logOutHandler}>Logout</ButtonSmall>
        <ButtonSmall onClick={handleButton}></ButtonSmall>
      </TabContainer>
      <Content>
        {/* Render content based on selectedTab */}
        {selectedTab === "overview" && <Overview />}
        {selectedTab === "payments" && <Payments />}
        {selectedTab === "subscriptions" && <Subscriptions />}
        {selectedTab === "transactions" && <Transactions />}
        {selectedTab === "notifications" && <Notifications />}
      </Content>
    </DashboardContainer>
  );
};
