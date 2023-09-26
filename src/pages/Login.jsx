import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { login } from "../redux/authReducer/action";
import { useLocation, useNavigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("eve.holt@reqres.in");
  const [password, setPassword] = React.useState("");
  const location = useLocation();
  const commingFrom = location?.state?.pathname || "/dashboard";

  function handleSubmit() {
    const user = {
      email,
      password,
    };
    dispatch(login(user));
    navigate(commingFrom);
  }

  return (
    <DIV>
      <h2>Log In</h2>
      <input
        data-testid="user-email"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        data-testid="user-password"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button data-testid="user-login" onClick={handleSubmit}>
        Log In
      </button>
    </DIV>
  );
};

const DIV = styled.div`
  width: 400px;
  padding: 20px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border: 1px solid gray;
  align-items: center;

  input {
    width: 80%;
    height: 30px;
    font-size: larger;
  }

  button {
    width: 150px;
    height: 30px;
    font-size: large;
  }
`;
