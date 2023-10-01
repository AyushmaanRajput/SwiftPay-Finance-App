// Login.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { login } from "../redux/authReducer/action";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "../components/forms/Input";
import { useCustomToast } from "../components/utils/useCustomToast";

export const Login = () => {
  const dispatch = useDispatch();
  const users = useSelector((store) => store.usersReducer.users);
  // console.log(users);
  const navigate = useNavigate();
  const { showToast, ToastContainer } = useCustomToast();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const location = useLocation();
  const commingFrom = location?.state?.pathname || "/dashboard";

  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(login(user, showToast, users, navigate));
  }

  function navigateTo(path) {
    navigate(path);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h4>Log In</h4>
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
        <button type="submit" data-testid="user-login" onClick={handleSubmit}>
          Log In
        </button>
        <ToastContainer />
      </form>
    </>
  );
};
