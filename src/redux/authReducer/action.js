import {
  POSTLOGINREQUEST,
  POSTLOGINFAIL,
  POSTLOGINSUCCESS,
} from "./actionTypes";
import axios from "axios";

export const login = (user) => (dispatch) => {
  dispatch({ type: POSTLOGINREQUEST });
  console.log(user);
  let data;
  if (user.email == "admin") {
    if (user.email === "admin" && user.password === "admin") {
      dispatch({ type: POSTLOGINSUCCESS, payload: "fasdkhfhasdfa" });
    } else {
      dispatch({ type: POSTLOGINFAIL });
    }
    data = "random";
  } else {
    data = axios
      .post("https://reqres.in/api/login", user)
      .then((res) => {
        console.log(res);
        dispatch({ type: POSTLOGINSUCCESS, payload: res.data.token });
      })
      .catch((err) => {
        dispatch({ type: POSTLOGINFAIL });
        console.log(err);
      });
  }
  return data;
};
