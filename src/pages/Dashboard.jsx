import React, { useState } from "react";
import styled from "styled-components";
import { Overview } from "../components/Overview";
import { Payments } from "../components/Payments";
import { Subscriptions } from "../components/Subscriptions";
import { Transactions } from "../components/Transactions";

const DashboardContainer = styled.div`
  display: flex;
  background-color: var(--background-dark);
  min-height: 100vh;
`;

const TabContainer = styled.div`
  width: 20%;
  background-color: var(--background-light);
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

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <DashboardContainer>
      <TabContainer>
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
        </Tabs>
      </TabContainer>
      <Content>
        {/* Render content based on selectedTab */}
        {selectedTab === "overview" && <Overview />}
        {selectedTab === "payments" && <Payments />}
        {selectedTab === "subscriptions" && <Subscriptions />}
        {selectedTab === "transactions" && <Transactions />}
      </Content>
    </DashboardContainer>
  );
};
