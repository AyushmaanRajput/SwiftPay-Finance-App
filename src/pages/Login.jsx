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
        <div>
          <div className="login-button-div">
            <button
              onClick={showLogin}
              disabled={isLoginVisible}
              style={{
                backgroundColor: isSignUpVisible
                  ? "transparent"
                  : "var(--primary)",
                color: isSignUpVisible
                  ? "var(--primary)"
                  : "var(--background-light)",
                border: isSignUpVisible
                  ? "1px solid var(--primary)"
                  : "1px solid transparent",
              }}
            >
              Login
            </button>
            <button
              onClick={showSignUp}
              disabled={isSignUpVisible}
              style={{
                backgroundColor: isLoginVisible
                  ? "transparent"
                  : "var(--primary)",
                color: isLoginVisible
                  ? "var(--primary)"
                  : "var(--background-light)",
                border: isLoginVisible
                  ? "1px solid var(--primary)"
                  : "1px solid transparent",
              }}
            >
              Sign Up
            </button>
          </div>
          <div className="login-content-div">
            {isLoginVisible && <LoginForm />}
            {isSignUpVisible && <SignUpForm />}
          </div>
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
  justify-content: center;
  width: 35rem;
  margin-top: 6rem;
  /* background-image: var(--secondary-gradient); */
  background-color: var(--background-light);
  border-radius: 2rem;
  > div:first-of-type {
    margin-inline: auto;
    /* border:1px solid red; */
    padding-top: 2rem;
  }
  button {
    font-size: 15px;
    border-radius: 20px;
    padding: 5px 15px;
    background-color: var(--primary);
  }
  .login-button-div {
    /* border: 1px solid gray; */
    width: 100%;
    display: flex;
    margin-bottom: 2rem;
    gap: 1rem;
    justify-content: flex-start;
  }
  .login-content-div {
    /* border: 1px solid gray; */
    /* width: 100%; */
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: center;
    margin-bottom: 2rem;
    label {
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--primary-grey);
      font-weight: 400;
      /* font-size:var(--button); */
    }
    input {
    width: 100%;
    padding: 0.5rem 1rem;
    border: 1px solid var(--primary-grey);
    background-color: transparent;
    color: var(--primary-white);
    border-radius: 0.25rem;
    &:focus {
      outline-color: var(--primary-light);
    }
  }
  }
`;
