import React, { useState } from "react";
import styled from "styled-components";
import { LoginForm } from "../components/forms/LoginForm";
import { SignUpForm } from "../components/forms/SignUpForm";
import { HomeNav } from "./sections/HomeNav";
import { HomeFooter } from "./sections/HomeFooter";

export const AuthPage = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(true);
  const [isSignUpVisible, setIsSignUpVisible] = useState(false);

  const showLogin = () => {
    setIsLoginVisible(true);
    setIsSignUpVisible(false);
  };

  const showSignUp = () => {
    setIsLoginVisible(false);
    setIsSignUpVisible(true);
  };

  return (
    <>
      <HomeNav></HomeNav>
      <DIV log={isLoginVisible}>
        {isSignUpVisible && (
          <h5
            style={{
              color: "var(--primary-grey)",
              marginBottom: "10px",
              width: "100%",
            }}
          >
            Create a new account today, and get{" "}
            <span style={{ color: "var(--primary-light)" }}>
              500 SwiftCoins
            </span>{" "}
            for free.
          </h5>
        )}
        <div className="login-button-div">
          <button
            onClick={showLogin}
            disabled={isLoginVisible}
            style={{
              backgroundColor: isSignUpVisible
                ? "var(--primary-grey)"
                : "var(--primary)",
              color: "black",
            }}
          >
            Login
          </button>
          <button
            onClick={showSignUp}
            disabled={isSignUpVisible}
            style={{
              backgroundColor: isLoginVisible
                ? "var(--primary-grey)"
                : "var(--primary)",
              color: "black",
            }}
          >
            Sign Up
          </button>
        </div>
        <div className="login-content-div">
          {isLoginVisible && <LoginForm />}
          {isSignUpVisible && <SignUpForm />}
        </div>
      </DIV>
      <HomeFooter></HomeFooter>
    </>
  );
};

const DIV = styled.div`
  /* min-height: ; */
  padding: 20px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  width:35rem;
  margin-top:6rem;
  /* background-image: var(--secondary-gradient); */
  background-color:var(--background-light);
  border-radius:2rem;
  
  button {
    font-size: 15px;
    border-radius: 20px;
    padding: 5px 15px;
    background-color: var(--primary);
  }
  .login-button-div {
    /* border: 1px solid gray; */
    width:100%;
    display: flex;
    margin-top: 1rem;
    justify-content: space-evenly;
  }
  .login-content-div {
    /* border: 1px solid gray; */
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
  }
`;
