import React from "react";
import styled from "styled-components";
import { ButtonSmall } from "../../components/Buttons";
import { Container } from "../../components/Layouts";
import { Link, useNavigate } from "react-router-dom"; // Import Link from React Router

export const HomeNav = () => {
  const navigate = useNavigate();
  function scrollToSelector(selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  function onClickHandler() {
    navigate("/login");
  }

  return (
    <NAV>
      <Container className="navbar">
        <h4>LOGO</h4>
        <ul>
          <li>
            <Link to="/" onClick={() => scrollToSelector("#hero")}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/" onClick={() => scrollToSelector("#features")}>
              Features
            </Link>
          </li>
          <li>
            <Link to="/" onClick={() => scrollToSelector("#instructions")}>
              Instructions
            </Link>
          </li>
          <li>
            <Link to="/" onClick={() => scrollToSelector("#services")}>
              Services
            </Link>
          </li>
          <li>
            <Link to="/" onClick={() => scrollToSelector("#cta")}>
              CTA
            </Link>
          </li>
        </ul>
        <ButtonSmall onClick={onClickHandler}>Login</ButtonSmall>
      </Container>
    </NAV>
  );
};

const NAV = styled.div`
  background-color: var(--background-dark);
  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-block: 0.5rem;
  }
  h4 {
    color: var(--primary-white);
  }
  ul {
    display: flex;
    list-style: none;
  }
  ul li {
    margin-inline: 0.5rem;
  }

  ul li a {
    color: var(--primary-grey);
    transition: color 0.2s ease-in;
  }
  ul li a:hover {
    color: var(--primary);
  }
`;
