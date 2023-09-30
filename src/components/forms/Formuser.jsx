import React, { useEffect, useState } from "react";
import { AuthChange } from "../../redux/user/usersReducer/accountReducer/action";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

export const Formuser = () => {
  const [emailChange, setEmailChange] = useState("");
  const [passwordChange, setPasswordChange] = useState("");
  const [num, setNum] = useState(0);
  const userDetails = useSelector((store) => store.accountReducer.userDetails);

  const dispatch = useDispatch();
  const userData = localStorage.getItem("loggedInUser");
  const userID = JSON.parse(userData);

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
    if (userID && userID.id) {
      // Access user details based on userID.id
      const user = userDetails.find((el) => el.id === userID.id);

      if (user) {
        setEmailChange(user.email);
        setPasswordChange(user.password);
      }
    }
  }, [userDetails, userID]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newUserObj = {
      email: emailChange,
      password: passwordChange,
      mobile: num,
    };
    // console.log("ok");
    dispatch(AuthChange(newUserObj, userID.id));
  };
  return (
    <DIV>
      <div className="main-div">
        <div className="imageIcon">
          <img
            src={avatars[userID.avatarNum - 1]}
            style={{ width: "200px" }}
            className="icons"
          />
        </div>
        <button className="edit-btn">EDIT</button>
      </div>

      <input
        type="email"
        placeholder="Email"
        value={emailChange}
        onChange={(e) => setEmailChange(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={passwordChange}
        onChange={(e) => setPasswordChange(e.target.value)}
      />
      <input
        type="number"
        placeholder="Number"
        value={num}
        onChange={(e) =>
          setNum(!isNaN(e.target.value) ? +e.target.value : e.target.value)
        }
      />
      <button type="submit" onClick={handleSubmit}>
        Continue
      </button>
    </DIV>
  );
};
const DIV = styled.div`
  width: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  margin: 40px auto;
  gap: 15px;
  align-items: center;
  border: 2px solid red;

  .edit-btn {
    margin-top: 10px;
  }
`;
