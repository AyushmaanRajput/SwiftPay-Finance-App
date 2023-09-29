import { GETSUBSREQUEST, GETSUBSFAILURE, GETSUBSSUCESS } from "./actionTypes";
import axios from "axios";

export const getSubscriptions = ()=> (dispatch) => {
  dispatch({ type: GETSUBSREQUEST });
  const data = axios
    .get(`https://warlike-current.onrender.com/subscriptions`)
    .then((res) => {
      // console.log(res);
      dispatch({ type: GETSUBSSUCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: GETSUBSFAILURE });
      console.log(err);
    });

  return data;
};
