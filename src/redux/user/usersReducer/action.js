import axios from "axios";
import {
  GETUSERSREQUEST,
  GETUSERSFAILURE,
  GETUSERSSUCCESS,
  PATCHUSERSFAILURE,
  PATCHUSERSSUCCESS,
  PATCHUSERSREQUEST,
} from "./actionTypes";
import { UPDATELOGGEDINUSER } from "../../authReducer/actionTypes";

import { baseURL } from "../../store";

export const getUsers = (showToast) => async (dispatch) => {
  dispatch({ type: GETUSERSREQUEST });
  try {
    const res = await axios.get(`${baseURL}/users`);
    console.log(res);
    dispatch({ type: GETUSERSSUCCESS, payload: res.data });
    return res.data; // Resolve the Promise with user data
  } catch (err) {
    console.log(err);
    dispatch({ type: GETUSERSFAILURE });
    // showToast("error", "Couldn't fetch users :/");
    throw err; // Rethrow the error
  }
};

export const updateUser = (id, obj, showToast, message) => (dispatch) => {
  dispatch({ type: PATCHUSERSREQUEST });
  axios
    .put(`${baseURL}/users/${id}`, obj)
    .then((res) => {
      console.log("user was updated with id", id);
      console.log(res);
      dispatch({ type: PATCHUSERSSUCCESS, payload: res.data });
      if (res.data.id == JSON.parse(localStorage.getItem("id"))) {
        dispatch({ type: UPDATELOGGEDINUSER, payload: res.data });
      }
      if (showToast && message) {
        showToast("success", message);
      }
    })
    .catch((err) => {
      dispatch({ type: PATCHUSERSFAILURE });
      showToast("error", "Something went wrong");
      console.log(err);
    });
};
//console.log("ok")
