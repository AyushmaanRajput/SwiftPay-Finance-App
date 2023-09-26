import React from "react";
import { Container } from "../../components/Layouts";
import { Button } from "../../components/Buttons";
import styled from "styled-components";

export const Services = () => {
  return (
    <SERVICES id="services">
      <Container>
        <div className="subsection">
          <div className="subsection-content">
            <h2>Plan for every milestone.</h2>
            <p>
              Achieve your financial objectives with automated recommendations
              and tailored advice from a Certified Financial Planner™
            </p>
            <Button>Create A Plan</Button>
          </div>
          <div className="subsection-image">
            <img src="/Phone1.png" />
            <div className="subsection-banner">
              <img src="/Dribbble.svg" alt="Dribbble Icon" />
              <div>
                <h5>Spotify</h5>
                <p>Subscription</p>
              </div>
              <div>
                <h5>$60.00</h5>
                <p>09:50pm</p>
              </div>
            </div>
          </div>
        </div>
        <div className="subsection">
          <div className="subsection-image">
            <img src="/Phone2.png" />
            <div className="subsection-banner">
              <img src="/spotify.svg" alt="Spotify Icon" />
              <div>
                <h5>Spotify</h5>
                <p>Subscription</p>
              </div>
              <div>
                <h5>$60.00</h5>
                <p>09:50pm</p>
              </div>
            </div>
          </div>
          <div className="subsection-content">
            <h2>Expert guidance, straight to the point</h2>
            <p>
              For short-term and long-term plans, count on the professiona
              support of your own financial expert.
            </p>
            <Button>Start The Journey</Button>
          </div>
        </div>
      </Container>
    </SERVICES>
  );
};

const SERVICES = styled.section`
  padding-block: 15rem 5rem;
  .subsection {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    margin-bottom: 4rem;
  }
  .subsection > div {
    width: 49%;
  }
  .subsection-content {
    text-align: left;
  }
  .subsection-content h2 {
    line-height: 1.15;
    margin-bottom: 1rem;
  }
  .subsection-content p {
    font-size: var(--paragraph-small);
    color: var(--text-paragraph);
    max-width: 320px;
    margin-bottom: 2rem;
  }
  .subsection-content:nth-of-type(2) {
    text-align: right;
  }
  .subsection-content:nth-of-type(2) p {
    text-align: right;
    margin-left: auto;
  }

  .subsection-image {
    background: rgb(182, 246, 207);
    background: linear-gradient(
      90deg,
      rgba(182, 246, 207, 1) 0%,
      rgba(236, 246, 190, 1) 100%
    );
    overflow: hidden;
    position: relative;
    height: 400px;
  }
  .subsection-image > img {
    margin-inline: auto;
    margin-top: 20%;
    height: 120%;
    /* box-shadow: -1px 1px 5px 0 rgba(0 0 0 /0.1); */
  }
  .subsection-banner {
    position: absolute;
    top: 0;
    left: 50%;
    top: 70%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    width: 18rem;
    padding: 1rem;
    box-shadow: 0 2px 12px 0 rgba(0 0 0 / 0.2);
    /* border-radius:1rem; */
    background-color: var(--primary-white);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .subsection-banner img {
    width: 2.5rem;
    padding: 0.25rem;
    border: 1px solid var(--text-paragraph);
    border-radius: 50%;
  }
  .subsection-banner > div h5 {
    text-align: right;
    color: var(--text-heading);
  }
  .subsection-banner > div p {
    color: var(--text-paragraph);
    font-size: var(--link);
    text-align: right;
  }
`;
