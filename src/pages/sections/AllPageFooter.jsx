import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "../../components/Layouts";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

export const AllPageFooter = () => {
  return (
    <FOOTER>
      <hr />
      <div className="socials">
        <div className="logo">
          <img src="/logos/logo-primary.png" />
        </div>
        <div>
          <a href="#">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
        <p>
          <FontAwesomeIcon icon={faCopyright} className="copyright-icon" />
          2023 All rights reserved
        </p>
      </div>
    </FOOTER>
  );
};

const FOOTER = styled.footer`
  background-color: var(--background-dark);
  padding-top: 3rem;
  color: var(--primary-grey);
  margin-top: 5rem;
  .logo {
    width: 8rem;
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-block: 0.5rem;
    margin-bottom: 1rem;
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
  hr {
    margin-bottom: 1rem;
  }
  div.socials {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 1rem;
  }
  div.socials > div a {
    color: var(--primary-white);
    font-size: var(--text-paragraph);
    margin-right: 0.75rem;
  }
  div.socials > div a:hover {
    color: var(--primary);
  }

  div.socials > p {
    color: var(--primary-white);
    font-size: var(--button);
  }
  .copyright-icon {
    margin-right: 0.5rem;
  }
`;
