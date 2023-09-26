import React from "react";
import styled from "styled-components";

export const ButtonSmall = ({ children, onClick }) => {
  return <BUTTONSMALL onClick={onClick}>{children}</BUTTONSMALL>;
};

const BUTTONSMALL = styled.button`
  background-color: var(--primary);
  padding: 0.35rem 1rem;
  color: var(--text-button);
  border-radius: 50px;
  font-weight: 500;
  letter-spacing: 0.25px;
`;

export const Button = ({ children, onClick, bg }) => {
  return (
    <BUTTON onClick={onClick} bg={bg}>
      {children}
    </BUTTON>
  );
};

const BUTTON = styled.button`
  padding: 0.75rem 2rem;
  color: ${(props) =>
    props.bg ? "var(--primary-white)" : "var(--text-button)"};
  background-color: ${(props) =>
    props.bg === "dark" ? "var(--background-dark)" : "var(--primary)"};
  border-radius: 50px;
  font-weight: 600;
  letter-spacing: 0.25px;
`;
