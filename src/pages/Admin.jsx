import React, { useState } from "react";
import styled from "styled-components";
import { AllTransactions } from "../components/admin/AllTransactions";
import { Users } from "../components/admin/Users";
import { Support } from "../components/admin/Support";
import { AllSubscriptions } from "../components/admin/AllSubscriptions/AllSubscriptions";

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

export const Admin = () => {
  const [selectedTab, setSelectedTab] = useState("users");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <DashboardContainer>
      <TabContainer>
        <Tabs>
          <Tab
            selected={selectedTab === "users"}
            onClick={() => handleTabClick("users")}
          >
            Users
          </Tab>
          <Tab
            selected={selectedTab === "alltransactions"}
            onClick={() => handleTabClick("alltransactions")}
          >
            All Transactions
          </Tab>
          <Tab
            selected={selectedTab === "support"}
            onClick={() => handleTabClick("support")}
          >
            Support
          </Tab>
          <Tab
            selected={selectedTab === "allsubscriptions"}
            onClick={() => handleTabClick("allsubscriptions")}
          >
            All Subscriptions
          </Tab>
        </Tabs>
      </TabContainer>
      <Content>
        {selectedTab === "users" && <Users />}
        {selectedTab === "alltransactions" && <AllTransactions />}
        {selectedTab === "support" && <Support />}
        {selectedTab === "allsubscriptions" && <AllSubscriptions />}
      </Content>
    </DashboardContainer>
  );
};
