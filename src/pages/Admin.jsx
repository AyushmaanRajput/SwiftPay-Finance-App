import React, { useState } from "react";
import styled from "styled-components";
import { AllTransactions } from "../components/admin/AllTransactions";
import { Users } from "../components/admin/Users";
import { Support } from "../components/admin/Support";
import { AllSubscriptions } from "../components/admin/AllSubscriptions/AllSubscriptions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGOUT } from "../redux/authReducer/actionTypes";
import { ButtonSmall } from "../components/Buttons";
import { ContainerLarge } from "../components/Layouts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { AllPageFooter } from "./sections/AllPageFooter";
import { useToast } from "../components/custom/ToastProvider";

const DashboardContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--background-light);
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-block: 1rem 2rem;
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

const Hr = styled.hr`
  border: none;
  border-top: 1px solid var(--primary-grey);
  margin: 0;
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

export const Admin = () => {
  const showToast = useToast();
  const [selectedTab, setSelectedTab] = useState("users");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logOutHandler() {
    localStorage.removeItem("loggedInUser");
    dispatch({ type: LOGOUT });
    showToast("success", "Admin Logged Out Successfully");
    navigate("/");
  }

  return (
    <DashboardContainer>
      <ContainerLarge>
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
          </div>

          <ButtonSmall onClick={logOutHandler}>Logout</ButtonSmall>
        </TopBar>
        <Hr />
        <Content>
          {selectedTab === "users" && <Users />}
          {selectedTab === "alltransactions" && <AllTransactions />}
          {selectedTab === "support" && <Support />}
          {selectedTab === "allsubscriptions" && <AllSubscriptions />}
        </Content>
        <AllPageFooter></AllPageFooter>
      </ContainerLarge>
    </DashboardContainer>
  );
};
