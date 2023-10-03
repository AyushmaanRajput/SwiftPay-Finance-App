import axios from "axios";
import {
  GET_SUPPORT_FAILURE,
  GET_SUPPORT_REQUEST,
  GET_SUPPORT_SUCCESS,
  POST_QUERY_FAILURE,
  POST_QUERY_REQUEST,
  POST_QUERY_SUCCESS,
} from "./actionTypes";
import { baseURL } from "../../store";

export const postQuery = (queryObj, showToast) => (dispatch) => {
  dispatch({ type: POST_QUERY_REQUEST });
  axios
    .post(`${baseURL}/supports`, queryObj)
    .then((res) => {
      console.log(res);
      dispatch({ type: POST_QUERY_SUCCESS });
      showToast(
        "success",
        `Ticket Raised : Transaction Id : ${queryObj.transactionId}`
      );
    })
    .catch((error) => {
      dispatch({ type: POST_QUERY_FAILURE });
      showToast("error", "Failed To Post Ticket");
    });
};

export const supportData = () => (dispatch) => {
  dispatch({ type: GET_SUPPORT_REQUEST });
  axios
    .get(`${baseURL}/supports`)
    .then((res) => {
      dispatch({ type: GET_SUPPORT_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      dispatch({ type: GET_SUPPORT_FAILURE });
    });
};
