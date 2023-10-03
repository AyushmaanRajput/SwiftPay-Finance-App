import React, { useEffect, useState } from "react";
import { AuthChange } from "../../redux/user/accountReducer/action";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCoins } from "@fortawesome/free-solid-svg-icons";
import { ButtonSmall, ButtonOutline } from "../Buttons";
import { updateUser } from "../../redux/user/usersReducer/action";

export const Formuser = ({ edit, setEdit, onClose }) => {
  const [emailChange, setEmailChange] = useState("");
  const [passwordChange, setPasswordChange] = useState("");
  const [num, setNum] = useState(0);

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
      // const user = userDetails.find((el) => el.id === userID.id);
      const user = userID;
      if (user) {
        setEmailChange(user.email);
        setPasswordChange(user.password);
        setNum(user.mobile);
      }
    }
  }, [userDetails, userID]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newUserObj = {
      ...userID,
      email: emailChange,
      password: passwordChange,
      mobile: num,
    };
    console.log("ok");

    dispatch(updateUser(userID.id, newUserObj));
    goBack();
  };
  const handleEdit = () => {
    setEdit(true);
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
              <img src={avatars[userID.avatarNum - 1]} className="icons" />
              <div>
                <h5>
                  Name : <span>{userID.name}</span>
                </h5>
                <h5>
                  Email : <span>{userID.email}</span>
                </h5>
                <h5>
                  Mobile : <span>(+91)-{userID.mobile}</span>
                </h5>
                <h5>
                  Gender : <span>{userID.gender}</span>
                </h5>
              </div>
            </div>
            <div className="buttons">
              <ButtonOutline onClick={() => onClose()}>Go Back</ButtonOutline>
              <ButtonSmall className="edit-btn" onClick={handleEdit}>
                Edit Details
              </ButtonSmall>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="edit-form">
            <FontAwesomeIcon
              icon={faArrowLeft}
              onClick={goBack}
              className="back-icon"
            />
            <img src={avatars[userID.avatarNum - 1]} className="icons" />
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
                setNum(
                  !isNaN(e.target.value) ? +e.target.value : e.target.value
                )
              }
            />
            <div className="buttons">
              <ButtonOutline onClick={() => onClose()}>Cancel</ButtonOutline>
              <ButtonSmall type="submit" onClick={handleSubmit}>
                Update Profile
              </ButtonSmall>
            </div>
          </div>
        </>
      )}
    </DIV>
  );
};
const DIV = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  background-color: var(--background-light);
  .main-div {
    width: 30rem;
  }

  .back-icon {
    /* margin-right: 0; */
  }
  input {
    width: 100%;
    padding: 0.5rem 1rem;
    border: 1px solid var(--primary-grey);
    background-color: transparent;
    margin-bottom: 1rem;
    color: var(--primary-white);
    border-radius: 0.25rem;
    &:focus {
      outline-color: var(--primary-light);
    }
    &:last-of-type {
      margin-bottom: 3rem;
    }
  }
  .imageIcon {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: space-between;
    color: var(--primary-white);
    margin-bottom: 2rem;
    text-align: left;
    img {
      width: 25%;
      border-radius: 50%;
      border: 2px solid var(--primary-light);
    }

    > div {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-end;
      border-left: 1px solid var(--primary-grey);
      padding: 1rem 0 0.5rem 0.5rem;
      h5 {
        margin-bottom: 0.5rem;
        font-weight: 400;
        line-height: 1.2;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-size: var(--link);
        span {
          color: var(--primary-light);
        }
      }
    }
  }
  .buttons {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: flex-end;
  }
  .user-data-change {
    margin-top: 10px;
    width: 80%;
    height: 40px;
  }
  .edit-form {
    width: 25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .edit-form .icons {
    align-self: center;
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    margin-bottom: 2rem;
    border: 2px solid var(--primary-light);
  }
  .back-icon {
    color: var(--primary-grey);
    align-self: flex-start;
    font-size: 1.5rem;
    cursor: pointer;
  }
  .edit-form .buttons {
    align-self: flex-end;
  }
`;
