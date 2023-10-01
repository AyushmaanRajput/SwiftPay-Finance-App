import axios from "axios";
import {
  GETTRANSACTIONSFAILURE,
  GETTRANSACTIONSREQUEST,
  GETTRANSACTIONSSUCCESS,
  GET_TRANSACTION_FAILURE,
  GET_TRANSACTION_REQUEST,
  GET_TRANSACTION_SUCCESS,
} from "./actionTypes";
import { baseURL } from "../../store";

export const fetchData =
  ({ limit, pages, funcTotalPage }) =>
  (dispatch) => {
    dispatch({ type: GET_TRANSACTION_REQUEST });
    axios
      .get(
        `https://warlike-current.onrender.com/transactions?_page=${pages}&_limit=${limit}`
      )
      .then((res) => {
        dispatch({ type: GET_TRANSACTION_SUCCESS, payload: res.data });
        const total = res.headers.get("x-total-count");
        funcTotalPage(Math.ceil(total / limit));
      })
      .catch((error) => {
        dispatch({ type: GET_TRANSACTION_FAILURE });
      });
  };

export const getAllTransactions = () => (dispatch) => {
  dispatch({ type: GETTRANSACTIONSREQUEST });
  axios
    .get(`${baseURL}/transactions`)
    .then((res) => {
      dispatch({ type: GETTRANSACTIONSSUCCESS, payload: res.data });
    })
    .catch((error) => {
      dispatch({ type: GETTRANSACTIONSFAILURE });
    });
};
