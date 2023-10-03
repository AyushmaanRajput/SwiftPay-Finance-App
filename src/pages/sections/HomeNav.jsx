import React from "react";
import styled from "styled-components";
import { ButtonSmall } from "../../components/Buttons";
import { Container } from "../../components/Layouts";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../../redux/authReducer/actionTypes";
import { useToast} from '../../components/custom/ToastProvider';

export const HomeNav = () => {
  const showToast= useToast();
  const [user, setUser] = React.useState(
    useSelector((store) => store.authReducer.loggedInUser) || null
  );
  const dispatch = useDispatch();
  const { isAdmin, isAuth } = useSelector((store) => store.authReducer);
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
  function logOutHandler() {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    dispatch({ type: LOGOUT });
    showToast("success",'Logged Out Successfully');
  }
  console.log(isAdmin, user);

  const logoPrimary = "/logos/logo-primary.png";
  const logo2 = "/logos/logo-2.png";
  const logo3 = "/logos/logo-3.png";

  return (
    <NAV>
      <Container className="navbar">
        <h4>
          <img src={logoPrimary} alt="" />
        </h4>
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
          {isAdmin ? (
            <li>
              <Link to="/admin">Admin Dashboard</Link>
            </li>
          ) : (
            isAuth && (
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )
          )}
        </ul>
        {user || isAdmin ? (
          <ButtonSmall onClick={logOutHandler}>Logout</ButtonSmall>
        ) : (
          <ButtonSmall onClick={onClickHandler}>Login</ButtonSmall>
        )}
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
  img {
    width: 150px;
  }
`;
