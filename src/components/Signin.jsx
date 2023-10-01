import React, { useState } from "react";
import styled from "styled-components";

const initialState = {
  name: "",
  email: "",
  password: "",
  gender: "",
  mobile: "",
};

const SignIn = () => {
  const [userData, setUserData] = useState(initialState);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
    setUserData(initialState);
  };

  return (
    <Container>
      <h4>Sign In</h4>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor="name">Name:</label>
          <input
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
            <label>
              <input
                type="radio"
                id="male"
                name="gender"
                value="Male"
                checked={userData.gender === "Male"}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="Female"
                checked={userData.gender === "Female"}
                onChange={handleChange}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                id="other"
                name="gender"
                value="Other"
                checked={userData.gender === "Other"}
                onChange={handleChange}
              />
              Other
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
        <SubmitButton type="submit">Sign In</SubmitButton>
      </form>
    </Container>
  );
};

const Container = styled.div`
  width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
    text-align: left;
    font-weight: bold;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"],
  input[type="tel"] {
    width: 100%;
    padding: 10px;
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
  width: 35%;
  padding: 10px;
  background-color: #007bff;
  color: #080808;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

export default SignIn;
