import React, { useState } from "react";
import styled from "styled-components";
import { Avatars } from "../Avatars";

const initialState = {
  name: "",
  email: "",
  password: "",
  gender: "",
  mobile: "",
};

export const SignUpForm = () => {
  const [userData, setUserData] = useState(initialState);

  const [avatarNum, setAvatarNum] = useState(Avatars[0]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
    setUserData(initialState);
  };

  // const handleAvatar = () => {

  // }

  // console.log(Avatars);

  return (
    <>
      <Container>
        <form onSubmit={handleSubmit}>
          <div className="signup-avatar-div">
            <img src={avatarNum} className="signup-avatar-img" />
          </div>

          <FormGroup>
            <label htmlFor="name">Name:</label>
            <input
              // placeholder="Name"
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <label>Gender:</label>
            <RadioButtonGroup>
              <label className="signup-gender-label">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="Male"
                  checked={userData.gender === "Male"}
                  onChange={handleChange}
                />
                <span>Male</span>
              </label>
              <label className="signup-gender-label">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="Female"
                  checked={userData.gender === "Female"}
                  onChange={handleChange}
                />
                <span>Female</span>
              </label>
              <label className="signup-gender-label">
                <input
                  type="radio"
                  id="other"
                  name="gender"
                  value="Other"
                  checked={userData.gender === "Other"}
                  onChange={handleChange}
                  className="signup-gender-input"
                />
                <span>Other</span>
              </label>
            </RadioButtonGroup>
          </FormGroup>
          <FormGroup>
            <label htmlFor="mobile">Mobile:</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={userData.mobile}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <SubmitButton type="submit">Sign Up</SubmitButton>
        </form>
      </Container>
    </>
  );
};

const Container = styled.div`
  /* border:1px solid red; */
  width: 25rem;
  /* padding: 20px; */
  border-radius: 5px;

  .signup-avatar-div {
    display: flex;
    justify-content: center;
    /* border: 1px solid black; */
  }

  .signup-avatar-img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    border: 2px solid var(--primary-light);
    cursor: pointer;
  }

  form {
    width: 100%;
    /* background: red; */
  }
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  width: 100%;

  label {
    display: block;
    margin-bottom: 5px;
    text-align: left;
    font-weight: bold;
    font-size: 14px;
    color: var(--primary-light);
  }

  span {
    margin-left: 5px;
  }

  .signup-gender-label {
    font-weight: normal;
    font-size: 16px;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"],
  input[type="tel"] {
    width: 100%;
    padding: 5px;
    border: 2px solid #ccc;
    border-radius: 5px;
    margin-left: 0%;
  }
`;

const RadioButtonGroup = styled.div`
  display: flex;
  gap: 10px;

  label {
    display: flex;
    align-items: center;
  }
`;

const SubmitButton = styled.button`
  margin-top: 2rem;
  width: 30%;
  padding: 10px;
  color: #080808;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;
