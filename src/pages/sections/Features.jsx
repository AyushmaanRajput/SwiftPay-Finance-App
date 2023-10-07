import React from "react";
import { Container } from "../../components/Layouts";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBusinessTime,
  faFileInvoice,
} from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";

export const Features = () => {
  return (
    <FEATURES id="features">
      <Container>
        <div className="feature-header">
          <h2>Finance guidance every moment</h2>
          <p>
            Let us help you identify strategic opportunities and increase impact
            with every dollar.
          </p>
        </div>
        <div className="features">
          <div className="feature-infocard">
            <div>
              <FontAwesomeIcon icon={faBusinessTime} className="icon" />
            </div>
            <h5>Financial stress is at an all-time high</h5>
            <p>
              Financial stress is the leading cause of employee stress,
              resulting in lost productivity and double the chance.
            </p>
          </div>
          <div className="feature-infocard">
            <div>
              <FontAwesomeIcon icon={faThumbsUp} className="icon" />
            </div>
            <h5>Compensation packages are complex</h5>
            <p>
              Employees often don't understand the full value of their total
              rewards packages and are missing out.
            </p>
          </div>
          <div className="feature-infocard">
            <div>
              <FontAwesomeIcon icon={faFileInvoice} className="icon" />
            </div>
            <h5>Limited access to financial advice</h5>
            <p>
              Wealth management is geared towards high-net-worth individuals,
              othem with a $1 million
            </p>
          </div>
        </div>
      </Container>
    </FEATURES>
  );
};

const FEATURES = styled.section`
  width: min(69rem, 100%);
  margin-inline: auto;
  background-color: var(--background-dark);
  color: var(--primary-white);
  padding-block: 3rem;
  position: relative;

  div.feature-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding-block: 1rem 5rem;
    margin-bottom: 2rem;
  }
  div.feature-header h2 {
    max-width: 400px;
    line-height: 1.1;
    text-align: left;
  }
  div.feature-header p {
    color: var(--primary-grey);
    font-size: var(--paragraph-small);
    max-width: 40%;
    text-align: right;
  }
  .features {
    position: absolute;
    bottom: -50%;
    display: flex;
    width: min(63rem, 100%);
    padding-inline: 1rem;

    align-items: center;
    justify-content: space-between;
    /* gap: 2rem; */
  }

  .features .feature-infocard {
    display: block;
    width: 32%;
    padding: 2rem;
    background-color: var(--primary-white);
    color: var(--text-paragraph);
    min-height: 250px;
    box-shadow: 0px 1px 10px 0 rgba(0, 0, 0, 0.1);
  }
  .features .feature-infocard > div .icon {
    display: inline-block;
    margin-bottom: 1rem;
    padding: 1rem;
    background: rgb(182, 246, 207);
    background: linear-gradient(
      90deg,
      rgba(182, 246, 207, 1) 0%,
      rgba(236, 246, 190, 1) 100%
    );
    width: 30px;
    height: 30px;
    border-radius: 50%;
    color: var(--background-light);
  }
  .features .feature-infocard h5 {
    max-width: 70%;
    margin-inline: auto;
    margin-bottom: 1rem;
    color: var(--background-light);
  }

  .features .feature-infocard p {
    font-size: var(--link);
  }
  @media screen and (max-width: 1050px) {
    margin-inline: auto;
    padding-inline: 1rem;

    div.feature-header {
      padding-block: 1rem 5rem;
    }
    .features {
      width: 95%;
      margin-inline: auto;
      padding-inline: 1rem;
      align-items: flex-start;
      /* gap: 2rem; */
    }

    .features .feature-infocard {
      width: 30%;
      padding: 1rem;
      min-height: auto;
    }
    .features .feature-infocard > div .icon {
      padding: 1rem;
      width: 25px;
      height: 25px;
    }
  }

  @media screen and (max-width: 650px) {
    width: 100%;
    padding-inline:0;
    div.feature-header {
      margin-bottom: 2rem;
    }
    div.feature-header h2 {
      font-size: var(--h3);
    }
    div.feature-header p {
      margin-bottom: 5rem;
    }
    .features {
      /* flex-direction:column;  */
      /* margin-top: 10rem; */
      position: absolute;
      bottom: -10%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .features .feature-infocard {
      display: block;
      width: 100%;
      margin-top:2rem;
      padding:1rem 0.5rem;
      height: auto;
      &:nth-of-type(3) {
        display: none;
      }
    }
    .features .feature-infocard > div .icon {
      margin-bottom: 1rem;
      width: 20px;
      height: 20px;
    }
    .features .feature-infocard h5 {
      max-width: auto;
      margin-bottom: 0.5rem;
    }
  }
`;
