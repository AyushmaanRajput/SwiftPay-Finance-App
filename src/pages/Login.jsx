// Login.js
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { login } from "../redux/authReducer/action";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "../components/forms/Input";
import { useCustomToast } from "../components/utils/useCustomToast";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast, ToastContainer } = useCustomToast();
  const [email, setEmail] = React.useState("eve.holt@reqres.in");
  const [password, setPassword] = React.useState("");
  const location = useLocation();
  const commingFrom = location?.state?.pathname || "/dashboard";

  function handleSubmit() {
    const user = {
      email,
      password,
    };
    dispatch(login(user, showToast));
    navigateTo(commingFrom);
  }

  function navigateTo(path) {
    navigate(path);
  }

  return (
    <DIV>
      <h2>Log In</h2>
      <Input
        label="Email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button data-testid="user-login" onClick={handleSubmit}>
        Log In
      </button>
      <ToastContainer />
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

  button {
    width: 150px;
    height: 30px;
    font-size: large;
  }
`;
