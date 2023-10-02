import axios from "axios";
import {
  GETTRANSACTIONSFAILURE,
  GETTRANSACTIONSREQUEST,
  GETTRANSACTIONSSUCCESS,
} from "./actionTypes";
import { baseURL } from "../../store";

export const getAllTransactions =
  (page, limit, funcTotalPage) => (dispatch) => {
    dispatch({ type: GETTRANSACTIONSREQUEST });
    
    if (page && limit) {
      axios
        .get(`${baseURL}/transactions?_page=${page}&_limit=${limit}`)
        .then((res) => {
          dispatch({ type: GETTRANSACTIONSSUCCESS, payload: res.data });
          const total = res.headers.get("x-total-count");
          funcTotalPage(Math.ceil(total / limit));
        })
        .catch((error) => {
          dispatch({ type: GETTRANSACTIONSFAILURE });
        });
    } else {
      axios
        .get(`${baseURL}/transactions`)
        .then((res) => {
          dispatch({ type: GETTRANSACTIONSSUCCESS, payload: res.data });
        })
        .catch((error) => {
          dispatch({ type: GETTRANSACTIONSFAILURE });
        });
    }
  };
