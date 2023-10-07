import React from "react";
import styled from "styled-components";
import { ButtonSmall } from "../../components/Buttons";
import { Container } from "../../components/Layouts";

export const Hero = () => {
  return (
    <HERO id="hero">
      <Container>
        <h1>Money transfers made simple</h1>
        <p>
          Let us help you identify strategic opportunities and increase impact
          with every dollar.
        </p>
        <div className="blob"></div>
        <img src="/HeroImage.png" alt="Hero Image" />
      </Container>
    </HERO>
  );
};

const HERO = styled.section`
  text-align: center;
  background-color: var(--background-dark);
  padding-block: 3rem 30rem;
  overflow: hidden;
  position: relative;
  h1 {
    color: var(--primary-white);
    line-height: 1.1;
    margin-bottom: 1rem;
    width: min(40rem, 100%);
    font-weight: 500;
    margin-inline: auto;
  }
  p {
    color: var(--primary-grey);
    margin-bottom:1rem;
  }
  div.blob {
    position: absolute;
    width: min(55rem, 100%);
    height: 100%;
    left: 50%;
    transform: translate(-50%);
    background-color: var(--primary-grey);
    opacity: 0.4;
    border-radius: 53% 47% 51% 49% / 45% 37% 63% 55%;
  }
  img {
    position: absolute;
    bottom:-2%;
    left: 50%;
    transform: translate(-50%, 2rem);
    padding-inline: 1rem;
    /* background-color:red; */
  }
  @media screen and (max-width: 550px) {
    padding-block: 3rem 20rem;
    div.blob {
    position: absolute;
    width: min(55rem, 100%);
    height: 80%;}
    img {
      bottom:5%;
      width: 70%;
    }
  }
`;
