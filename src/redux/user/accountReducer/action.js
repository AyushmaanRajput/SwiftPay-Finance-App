import axios from "axios";
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCESS } from "./actionType";

//http://localhost:8080/users/${id}
export const AuthChange = (obj, id) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  let data = axios
    .patch(`baseURL/${id}`, obj)
    .then((res) => {
      dispatch({ type: LOGIN_SUCESS });
      console.log(res);
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAIL });
    });
  return data;
};
