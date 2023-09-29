import axios from "axios";
import {
  GET_DATA,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCESS,
} from "./actionType";
export const getdata = (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  axios
    .get("http://localhost:8080/users")
    .then((res) => {
      dispatch({ type: GET_DATA,payload:res.data});
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAIL });
    });
};
export const AuthChange = (obj, id) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  let data = axios
    .patch(`http://localhost:8080/users/${id}`, obj)
    .then((res) => {
      dispatch({ type: LOGIN_SUCESS });
      console.log(res);
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAIL });
    });
  return data;
};
