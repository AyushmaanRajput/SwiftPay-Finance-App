import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faFileInvoice,
} from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { baseURL } from "../../redux/store";

export const Users = () => {
  const [user, setUserData] = useState([]);
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
    axios
      .get(`${baseURL}/users`)
      .then((res) => {
        setUserData(res.data);
        // console.log(res.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <DIV className="user-container">
      <h2>USERS</h2>
      <div className="header">
        <div className="header-div A">
          <div className="div-1">
            <h5>{user.length}</h5>
            <p>Registered User</p>
          </div>
          <div className="div-2">
            <FontAwesomeIcon
              color="var(--primary)"
              icon={faFileInvoice}
              className="icons"
            />
          </div>
        </div>
        <div className="header-div B">
          <div className="div-1">
            <h5>144</h5>
            <p>Daily Visitors</p>
          </div>
          <div className="div-2">
            <FontAwesomeIcon color="orange" icon={faEye} className="icons" />
          </div>
        </div>
        <div className="header-div C">
          <div className="div-1">
            <h5>23</h5>
            <p>New Messages</p>
          </div>
          <div className="div-2">
            <FontAwesomeIcon
              color="#00ccffc3"
              icon={faEnvelope}
              className="icons"
            />
          </div>
        </div>
      </div>
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
              {user.map((element) => {
                return (
                  <tr key={element.id} className="table-card">
                    <td className="user-card-id">
                      <img
                        src={avatars[element.avatarNum - 1]}
                        style={{ width: "90px" }}
                      />
                    </td>
                    <td className="user-card-name">{element.name}</td>
                    <td className="user-card-email">{element.email}</td>
                    <td className="user-card-gender">{element.gender}</td>
                    <td className="user-card-swiftCoin">{element.swiftCoin}</td>
                    <td className="user-card-total-subscriptions">
                      {element.subscriptions.length}
                    </td>
                    <td className="user-card-contact-no">{element.mobile}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DIV>
  );
};
const DIV = styled.div`
  color: var(--primary-white);
  /* border: 2px solid white; */
  text-align: center;

  .header {
    /* border: 2px solid red; */
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-top: 20px;
  }

  .header-div {
    /* border: 2px solid gray; */
    display: flex;
    flex: 1;
    justify-content: center;
    gap: 120px;
    width: 100px;
    height: 100px;
  }

  .A {
    background-color: var(--primary);
  }
  .B {
    background-color: orange;
  }
  .C {
    background-color: #00ccffc3;
  }
  .div-1 {
    /* border: 2px solid red; */
    margin-top: 20px;
    text-align: left;
  }
  h5 {
    font-size: 24px;
    font-weight: 300;
  }
  .div-2 {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: white;
  }
  .icons {
    width: 30px;
    height: 30px;
    background-color: white;
  }

  //tabular Css
  .user {
    /* border: 2px solid green; */
    margin-top: 50px;
  }
  .table-container:hover {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  }

  th {
    border: 1px solid #ccc;
    margin: 10px;
    padding: 10px;
  }
  td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ccc;
  }
`;
