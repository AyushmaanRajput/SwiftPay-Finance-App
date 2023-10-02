import axios from "axios";
import {
  GETTRANSACTIONSFAILURE,
  GETTRANSACTIONSREQUEST,
  GETTRANSACTIONSSUCCESS,
} from "./actionTypes";
import { baseURL } from "../../store";

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
