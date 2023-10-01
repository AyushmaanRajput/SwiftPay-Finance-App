import React, { useEffect, useState } from "react";
import { AuthChange } from "../../redux/user/accountReducer/action";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCoins } from "@fortawesome/free-solid-svg-icons";

export const Formuser = ({ edit, setEdit }) => {
  const [emailChange, setEmailChange] = useState("");
  const [passwordChange, setPasswordChange] = useState("");
  const [num, setNum] = useState("");

  //  console.log(edit)
  const userDetails = useSelector((store) => store.accountReducer.userDetails);

  const dispatch = useDispatch();
  const userID = useSelector((store) => store.authReducer.loggedInUser);
  // let newObj={
  //   ...userID,
  //   email:emailChange,
  //   password:passwordChange,
  //   mobile:num
  // }
  //dispatch(updateUser(userID.id,newObj))
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
    console.log("ok");
    dispatch(AuthChange(newUserObj, userID.id));
  };
  const handleEdit = () => {
    setEdit(true);
    // console.log("ok");
  };
  const goBack = () => {
    setEdit(false);
  };
  return (
    <DIV>
      {!edit ? (
        <>
          <div className="main-div">
            <div className="imageIcon">
              <img
                src={avatars[userID.avatarNum - 1]}
                style={{ width: "200px" }}
                className="icons"
              />
              <h4>{userID.name}</h4>
              <p>Balance: {userID.balance}</p>
              <p>
                swiftCoin: {userID.swiftCoin}
                <FontAwesomeIcon icon={faCoins} />
              </p>
              <p>+{userID.mobile}</p>
            </div>
            <button className="edit-btn" onClick={handleEdit}>
              EDIT
            </button>
          </div>
        </>
      ) : (
        <>
          <FontAwesomeIcon
            icon={faArrowLeft}
            onClick={goBack}
            className="back-icon"
          />
          <div className="imageIcon">
            <img
              src={avatars[userID.avatarNum - 1]}
              style={{ width: "200px" }}
              className="icons"
            />
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
          <button
            type="submit"
            onClick={handleSubmit}
            className="user-data-change"
          >
            Continue
          </button>
        </>
      )}
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
  background-color: var(--gradient1);
  .edit-btn {
    margin-top: 10px;
    width: 80%;
    height: 40px;
  }

  .back-icon {
    margin-right: 20rem;
  }
  .icons {
    border-radius: 50%;
  }
  input {
    width: 80%;
    height: 40px;
  }
  .imageIcon {
    gap: 15px;
  }
  .user-data-change {
    margin-top: 10px;
    width: 80%;
    height: 40px;
  }
`;
