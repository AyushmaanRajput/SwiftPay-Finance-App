import React, { useEffect, useState } from "react";
import { AuthChange } from "../../redux/user/accountReducer/action";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCoins } from "@fortawesome/free-solid-svg-icons";
import { ButtonSmall, ButtonOutline } from "../Buttons";

export const Formuser = ({ edit, setEdit,onClose }) => {
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
            <div className='buttons'>
              <ButtonOutline onClick={()=>onClose()}>Go Back</ButtonOutline>
              <ButtonSmall className="edit-btn" onClick={handleEdit}>
                Edit Details
              </ButtonSmall>
            </div>
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
            <img src={avatars[userID.avatarNum - 1]} className="icons" />
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
  width: 30rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  background-color: var(--background-light);

  .back-icon {
    /* margin-right: 0; */
  }
  input {
    width: 80%;
    height: 40px;
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
  .buttons{
    display: flex;
    gap:1rem;
    align-items:center;
    justify-content:flex-end;
  }
  .user-data-change {
    margin-top: 10px;
    width: 80%;
    height: 40px;
  }
`;
