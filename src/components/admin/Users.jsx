import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faFileInvoice,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { baseURL } from "../../redux/store";

export const Users = () => {
  const [user, setUserData] = useState([]);

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
    axios
      .get(`${baseURL}/users`)
      .then((res) => {
        setUserData(res.data);
        // console.log(res.data);
      })
      .catch((err) => {});
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

  return (
    <DIV className="user-container">
      <SEARCH>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={handleChange}
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
      </SEARCH>
      <div className="header">
        {/* ... (rest of your code) */}
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
            <h5>64</h5>
            <p>Daily Visitors</p>
          </div>
          <div className="div-2">
            <FontAwesomeIcon
              color="var(--primary)"
              icon={faEye}
              className="icons"
            />
          </div>
        </div>
        <div className="header-div C">
          <div className="div-1">
            <h5>23</h5>
            <p>New Messages</p>
          </div>
          <div className="div-2">
            <FontAwesomeIcon
              color="var(--primary)"
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
                      <td className="user-card-id">
                        <img
                          src={avatars[element.avatarNum - 1]}
                          style={{ width: "90px" }}
                        />
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

// <DIV className="user-container">
//   <SEARCH>
//     <input
//       type="text"
//       placeholder="Search by name..."
//       value={search}
//       onChange={handleChange}
//     />
//   </SEARCH>
//   <div className="header">
//     {/* ... (rest of your code) */}
//     <div className="header-div A">
//       <div className="div-1">
//         <h5>{user.length}</h5>
//         <p>Registered User</p>
//       </div>
//       <div className="div-2">
//         <FontAwesomeIcon
//           color="var(--primary)"
//           icon={faFileInvoice}
//           className="icons"
//         />
//       </div>
//     </div>
//     <div className="header-div B">
//       <div className="div-1">
//         <h5>64</h5>
//         <p>Daily Visitors</p>
//       </div>
//       <div className="div-2">
//         <FontAwesomeIcon
//           color="var(--primary)"
//           icon={faEye}
//           className="icons"
//         />
//       </div>
//     </div>
//     <div className="header-div C">
//       <div className="div-1">
//         <h5>23</h5>
//         <p>New Messages</p>
//       </div>
//       <div className="div-2">
//         <FontAwesomeIcon
//           color="var(--primary)"
//           icon={faEnvelope}
//           className="icons"
//         />
//       </div>
//     </div>
//   </div>
//   <div className="user">
//     <div className="table-container">
//       <table>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Gender</th>
//             <th>SwiftCoin</th>
//             <th>Subscriptions</th>
//             <th>Contact No.</th>
//           </tr>
//         </thead>
//         <tbody>
//           {searchResult.length > 0
//             ? searchResult.map((element) => (
//                 <tr
//                   key={element.id}
//                   className="table-card"
//                   style={{
//                     background:
//                       search &&
//                       element.name
//                         .toLowerCase()
//                         .includes(search.toLowerCase())
//                         ? "yellow"
//                         : "",
//                   }}
//                 >
//                   {/* ... (rest of your code) */}
//                 </tr>
//               ))
//             : user.map((element) => (
//                 <tr
//                   key={element.id}
//                   className="table-card"
//                   style={{
//                     background:
//                       search &&
//                       element.name
//                         .toLowerCase()
//                         .includes(search.toLowerCase())
//                         ? "yellow"
//                         : "",
//                   }}
//                 >
//                   {/* ... (rest of your code) */}
//                   <td className="user-card-id">
//                     <img
//                       src={avatars[element.avatarNum - 1]}
//                       style={{ width: "90px" }}
//                     />
//                   </td>
//                   <td className="user-card-name">{element.name}</td>
//                   <td className="user-card-email">{element.email}</td>
//                   <td className="user-card-gender">{element.gender}</td>
//                   <td className="user-card-swiftCoin">
//                     {element.swiftCoin}
//                   </td>
//                   <td className="user-card-total-subscriptions">
//                     {element.subscriptions.length}
//                   </td>
//                   <td className="user-card-contact-no">{element.mobile}</td>
//                 </tr>
//               ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// </DIV>
const DIV = styled.div`
  color: var(--primary-white);
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
    border-radius: 1.75em;

    /* font-size: 0.85rem; */
  }

  .A {
    /* background-color: var(--primary); */
    background-color: #f5f5f599;
    &:hover {
      background-color: var(--primary-light);
    }
  }
  .B {
    background-color: #454340;
    &:hover {
      background-color: var(--primary-light);
    }
  }
  .C {
    background-color: #454340;
    &:hover {
      background-color: var(--primary-light);
      border-color: transparent;
    }
  }

  .div-1 {
    /* border: 2px solid red; */
    margin-top: 20px;
    margin-right: 10rem;
    text-align: left;
  }
  h5 {
    font-weight: 2rem;
    line-height: 1.1;
    font-size: var(--h4);
    &:hover {
      color: var(--text-heading);
    }
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
    margin-top: 30px;
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
    border: 1px solid #ccc;
    margin: 10px;
    padding: 10px;
    width: 40px;
  }
  td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ccc;
  }
`;
/////
const SEARCH = styled.div`
  input {
    width: 300px; /* Adjust the width as needed */
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 20px; /* Adjust the radius value to control the roundness */
    outline: none; /* Remove the default input outline */
    font-size: 16px;
  }
  .search-icon {
    position: relative;
    right: 40px; /* Adjust the left position as needed */
    top: 60%;
    /* transform: translateY(-50%); */
    z-index: 1;
    color: var(--text-paragraph);
  }
`;
