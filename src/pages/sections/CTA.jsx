import React from "react";
import styled from "styled-components";
import { Button } from "../../components/Buttons";
import { Container } from "../../components/Layouts";

export const CTA = () => {
  return (
    <CALLTOACTION>
      <div className="testimonials"></div>
      <Container>
        <div className="cta">
          <div className="cta-content">
            <h2>Make Money Moves</h2>
            <p>
              Join thousands of people who are saving, investing and building
              long term wealth. Get started with our mobile app today.
            </p>
            <Button bg="dark">Download App</Button>
          </div>
          <div className="cta-image">
            <img src="/Phone3.png" alt="Call To Action Image" />
          </div>
        </div>
      </Container>
    </CALLTOACTION>
  );
};

const CALLTOACTION = styled.section`
  .cta {
    background-color: var(--primary);
    padding: 2rem 4rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .cta .cta-content {
  }
`;
