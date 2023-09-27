import {
  POSTLOGINREQUEST,
  POSTLOGINFAIL,
  POSTLOGINSUCCESS,
} from "./actionTypes";
import axios from "axios";

export const login =
  (user, showToast, commingFrom, navigateTo) => (dispatch) => {
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
          showToast("success", "Successfully logged in");
          dispatch({ type: POSTLOGINSUCCESS, payload: res.data.token });
          // navigateTo(commingFrom);
        })
        .catch((err) => {
          showToast("error", "Failed logged in");
          dispatch({ type: POSTLOGINFAIL });
          console.log(err);
          // navigateTo("/login");
        });
    }
    return data;
  };
