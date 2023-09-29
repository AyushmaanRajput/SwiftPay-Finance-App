import axios from "axios";
import {
  GETUSERSREQUEST,
  GETUSERSFAILURE,
  GETUSERSSUCCESS,
} from "./actionTypes";

export const getUsers = (showToast) => (dispatch) => {
  dispatch({ type: GETUSERSREQUEST });
  let data = axios
    .get(`https://warlike-current.onrender.com/users`)
    .then((res) => {
      console.log(res);
      dispatch({ type: GETUSERSSUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: GETUSERSFAILURE });
      showToast("error", "Couldn'nt fetch users :/");
    });

  return data;
};
