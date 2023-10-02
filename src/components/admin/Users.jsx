import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faFileInvoice,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { CardSmall } from "../overview/OverviewCards";

import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { baseURL } from "../../redux/store";
import Loader from "../Loader";

export const Users = () => {
  const [user, setUserData] = useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  ///
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  ///
  const avatars = [
    "/avatars/Asian Man.png",
    "/avatars/Black Lady.png",
    "/avatars/Black Man.png",
    "/avatars/College Student.png",
    "/avatars/Indian Man.png",
    "/avatars/Middle Eastern Lady.png",
    "/avatars/Old Man.png",
    "/avatars/Western Man.png",
    "/avatars/White Lady.png",
    "/avatars/Young Lady.png",
  ];

  useEffect(() => {
    // axios
    //   .get(`${baseURL}/users`)
    //   .then((res) => {
    //     setUserData(res.data);
    //     // console.log(res.data);
    //     setIsLoading(false);
    //   })
    //   .catch((err) => {
    //     setIsLoading(false);
    //   });
  }, []);

  const handleChange = (e) => {
    //   const { value } = e.target;
    console.log(e.target.value);
    setSearch(e.target.value);
  };
  useEffect(() => {
    if (search.trim() === "") {
      setSearchResult([]);
      return;
    }
    axios
      .get(`https://mock-api-finpay.onrender.com/users?name=${search}`)
      .then((res) => {
        setSearchResult(res.data);
        console.log(res.data);
      });
  }, [search]);

  const reorderedSearchResult = () => {
    if (searchResult.length === 0) {
      return user;
    }

    const matchingUser = searchResult[0];
    const remainingUsers = user.filter((u) => u.id !== matchingUser.id);
    return [matchingUser, ...remainingUsers];
  };

  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <DIV>
      <h1>Users</h1>

      <div className="info-cards">
        {/* ... (rest of your code) */}
        <CardSmall
          color="var(--background-light)"
          bg="var(--primary-grey)"
          accent="var(--primary-light)"
        >
          <div className="card-heading">
            <FontAwesomeIcon icon={faFileInvoice} className="icons" />
          </div>
          <div className="card-content">
            <h4>{user.length}</h4>
            <p>
              Registered <span>Users</span>
            </p>
          </div>
        </CardSmall>
        <CardSmall
          bg="var(--background-light)"
          color="var(--primary-white)"
          accent="var(--primary-light)"
        >
          <div className="card-heading">
            <FontAwesomeIcon icon={faEye} className="icons" />
          </div>
          <div className="card-content">
            <h4>64</h4>
            <p>
              Daily <span>Visitors</span>
            </p>
          </div>
        </CardSmall>
        <CardSmall
          bg="var(--background-light)"
          color="var(--primary-white)"
          accent="var(--primary-light)"
        >
          <div className="card-heading">
            <FontAwesomeIcon icon={faEnvelope} className="icons" />
          </div>
          <div className="card-content">
            <h4>23</h4>
            <p>
              New <span>Messages</span>
            </p>
          </div>
        </CardSmall>
      </div>
      <hr />
      <SEARCH>
        <h3>Search For User</h3>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={handleChange}
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
      </SEARCH>
      <div className="user">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>SwiftCoin</th>
                <th>Subscriptions</th>
                <th>Contact No.</th>
              </tr>
            </thead>
            <tbody>
              {searchResult.length > 0
                ? searchResult.map((element) => (
                    <tr
                      key={element.id}
                      className="table-card"
                      style={{
                        background:
                          search &&
                          element.name
                            .toLowerCase()
                            .includes(search.toLowerCase())
                            ? "var(--primary-light)"
                            : "",
                        color:
                          search &&
                          element.name
                            .toLowerCase()
                            .includes(search.toLowerCase())
                            ? "var(--background-light)"
                            : "",
                      }}
                    ></tr>
                  ))
                : user.map((element) => (
                    <tr
                      key={element.id}
                      className="table-card"
                      style={{
                        background:
                          search &&
                          element.name
                            .toLowerCase()
                            .includes(search.toLowerCase())
                            ? "var(--primary-light)"
                            : "",
                        color:
                          search &&
                          element.name
                            .toLowerCase()
                            .includes(search.toLowerCase())
                            ? "var(--background-light)"
                            : "",
                      }}
                    >
                      <td>
                        <img src={avatars[element.avatarNum - 1]} />
                      </td>
                      <td className="user-card-name">{element.name}</td>
                      <td className="user-card-email">{element.email}</td>
                      <td className="user-card-gender">{element.gender}</td>
                      <td className="user-card-swiftCoin">
                        {element.swiftCoin}
                      </td>
                      <td className="user-card-total-subscriptions">
                        {element.subscriptions.length}
                      </td>
                      <td className="user-card-contact-no">{element.mobile}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </DIV>
  );
};

const DIV = styled.div`
  color: var(--primary-white);
  text-align: left;
  h3 {
    margin-bottom: 1rem;
  }
  hr {
    background-color: var(--primary-grey);
    border-bottom: none;
    margin-bottom: 2rem;
  }
  .info-cards {
    width: 100%;
    display: flex;
    gap:1rem;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
    > * {
      flex-grow: 1;
    }
    .card-heading {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2rem;
    }
    .card-heading > *:first-child {
      color: var(--primary-light);
      font-size: 1rem;
      margin-right: 1rem;
      border: 4px solid var(--primary-light);
      padding: 1rem;
      border-radius: 50%;
    }
    .card-heading span {
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .card-content h4 {
      line-height: 1.1;
      font-size: var(--h4);
      margin-bottom: 1rem;
      /* color:var(--primary-white); */
    }
    .card-content p span {
      color: var(--primary-light);
    }
  }
  .icons {
    width: 2rem;
    height: 2rem;
    color: var(--primary-light);
  }

  .table-container:hover {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  table {
    width: 100%;

    /* border-collapse: collapse; */
    border-color: var(--primary-grey);
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  }

  th {
    border: 1px solid var(--primary-grey);
    margin: 10px;
    padding: 10px;
    width: 40px;
  }
  td {
    padding: 10px;
    text-align: left;
    border: 1px solid var(--primary-grey);
    text-align: center;
    img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
    }
  }
`;
const SEARCH = styled.div`
  text-align: left;
  input {
    color: var(--primary-white);
    width: 30%;
    padding: 0.5rem 1rem;
    border: 1px solid var(--primary-grey);
    background-color: transparent;
    margin-bottom: 2rem;
    border-radius: 0.25rem; /* Adjust the radius value to control the roundness */
    &:focus {
      outline-color: var(--primary-light);
    }
  }
  .search-icon {
    position: relative;
    right: 25px;
    top: 60%;
    z-index: 1;
    color: var(--primary-grey);
  }
  input:focus + .search-icon {
    color: var(--primary-light);
  }
`;
/////
