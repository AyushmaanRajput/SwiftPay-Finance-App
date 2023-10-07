import React from "react";
import styled from "styled-components";
import { Button } from "../../components/Buttons";
import { Container } from "../../components/Layouts";

export const CTA = () => {
  return (
    <CALLTOACTION id="cta">
      <Container>
        <div className="cta">
          <div className="cta-content">
            <h2>Make Money Moves.</h2>
            <p>
              Join thousands of people who are saving, investing and building
              long term wealth. Get started with our mobile app today.
            </p>
            <Button bg="dark">Download App</Button>
          </div>
          <div className="cta-image">
            <img src="/CTA2.png" alt="Call To Action Image" />
          </div>
        </div>
      </Container>
    </CALLTOACTION>
  );
};

const CALLTOACTION = styled.section`
  position: absolute;
  width: 100%;
  left: 50%;
  bottom: 70%;
  transform: translateX(-50%);

  .cta {
    position: relative;
    top: 100%;
    background-color: var(--primary);
    padding: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-height: 25rem;
  }

  .cta .cta-content {
    max-width: 20rem;
    text-align: left;
    margin-left: 2rem;
  }
  .cta .cta-content h2 {
    margin-bottom: 0.5rem;
    color: var(--text-heading);
  }
  .cta .cta-content p {
    margin-bottom: 2rem;
    color: var(--text-paragraph);
  }
  .cta .cta-image {
    overflow-x: hidden;
  }
  .cta .cta-image img {
    position: absolute;
    object-fit: cover;
    width: 25rem;
    /* margin-bottom:5.5rem; */
    bottom: 0;
    right: 10%;
    /* width:70%; */
  }
  @media screen and (max-width: 940px) {
    .cta .cta-content {
      max-width: 18rem;
      margin-left: 0rem;
    }
    .cta .cta-content p {
      margin-bottom: 1rem;
      color: var(--text-paragraph);
      font-size: var(--link);
    }
    .cta .cta-image img {
      width: 20rem;
      /* margin-bottom:5.5rem; */
      right: 6%;
      /* width:70%; */
    }
  }
  @media screen and (max-width: 700px) {
    .cta {
      padding: 1rem;
    }
    .cta .cta-content {
      max-width: 13rem;
      margin: 0rem;
    }
    .cta .cta-content h2{
      font-size:var(--h3);
    }
    .cta .cta-content p {
      margin-bottom: 1rem;
      color: var(--text-paragraph);
      font-size: var(--link);
    }
    .cta .cta-image img {
      width: 13rem;
      /* margin-bottom:5.5rem; */
      right: 3%;
      /* width:70%; */
    }
  }
`;
