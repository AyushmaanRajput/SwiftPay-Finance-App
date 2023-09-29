import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

export const Users = () => {
  const [user, setUserData] = useState([]);

  useEffect(() => {
    axios
      .get("https://mock-api-finpay.onrender.com/users")
      .then((res) => {
        setUserData(res.data);
        // console.log(res.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <DIV className="user-container">
      {/* <h1>USERS</h1> */}
      <div className="header">
        <div className="header-div">
          <div className="feature">
            {/* <div className="total-user"> */}
            <h4>34</h4>
            {/* </div> */}
            <div>
              <FontAwesomeIcon icon={faFileInvoice} className="icons" />
            </div>
          </div>
        </div>
        <div className="header-div"></div>
        <div className="header-div"></div>
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
                <th>No.of Subscriptions</th>
                <th>Contact No.</th>
              </tr>
            </thead>
            <tbody>
              {user.map((element) => {
                return (
                  <tr key={element.id} className="table-card">
                    <td className="user-card-id"></td>
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
    margin-top: 50px;
  }
  .header-div {
    border: 2px solid gray;
    flex: 1;
    width: 100px;
    height: 100px;
  }
  .feature {
    border: 2px solid yellow;
    display: flex;
    justify-content: center;
    gap: 120px;
    margin-top: 20px;
  }
  .feature > div {
    border: 2px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .icons {
    width: 30px;
    height: 30px;
  }

  //tabular Css
  .user {
    border: 2px solid green;
    margin-top: 50px;
  }
  .table-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  table {
    width: 100%;
    border-collapse: collapse;
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
  /* .user-card-total-subscriptions {
    padding-left: 10px;
  } */
`;
