import {
  POSTLOGINREQUEST,
  POSTLOGINFAIL,
  POSTLOGINSUCCESS,
} from "./actionTypes";
import axios from "axios";

export const login = (user) => (dispatch) => {
  dispatch({ type: POSTLOGINREQUEST });
  console.log(user);
  const data = axios
    .post("https://reqres.in/api/login", user)
    .then((res) => {
      console.log(res);
      dispatch({ type: POSTLOGINSUCCESS, payload: res.data.token });
    })
    .catch((err) => {
      dispatch({ type: POSTLOGINFAIL });
      console.log(err);
    });
  return data;
};
