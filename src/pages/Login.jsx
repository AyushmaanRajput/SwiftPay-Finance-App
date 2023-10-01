import React, { useState } from "react";
import styled from "styled-components";
import { Login } from "../components/Loginn";
import SignIn from "../components/Signin";
import { HomeNav } from "./sections/HomeNav";
import { HomeFooter } from "./sections/HomeFooter";

export const AuthPage = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(true);
  const [isSignInVisible, setIsSignInVisible] = useState(false);

  const showLogin = () => {
    setIsLoginVisible(true);
    setIsSignInVisible(false);
  };

  const showSignIn = () => {
    setIsLoginVisible(false);
    setIsSignInVisible(true);
  };

  return (
    <>
     <HomeNav></HomeNav>   
      <DIV log={isLoginVisible}>
        <div>
          <button onClick={showLogin} disabled={isLoginVisible}>
            Login
          </button>
          <button onClick={showSignIn} disabled={isSignInVisible}>
            Sign In
          </button>
        </div>
        {isLoginVisible && <Login />}
        {isSignInVisible && <SignIn />}
      </DIV>
      <HomeFooter></HomeFooter>
    </>
  );
};

const DIV = styled.div`
  width: ${(props) => 
  props.log ? "390px" : "470px"
  };
  padding: 20px;
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border: 1px solid gray;
  align-items: center;
  background-color: var(--primary-grey);
  
  button {
    font-size: larger;
    border-radius: 20px;
    padding: 5px 20px;
    margin-right: 20px;
    background-color: var(--primary);
  }
`;

