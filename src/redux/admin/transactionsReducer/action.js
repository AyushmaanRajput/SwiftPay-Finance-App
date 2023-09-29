import axios from "axios";
import { GET_TRANSACTION_FAILURE, GET_TRANSACTION_REQUEST, GET_TRANSACTION_SUCCESS } from "./actionTypes";


export const fetchData = ({limit, pages,funcTotalPage}) => (dispatch) => {
     dispatch({type:GET_TRANSACTION_REQUEST})
      axios
      .get(`https://warlike-current.onrender.com/transactions?_page=${pages}&_limit=${limit}`)
      .then((res)=> {
        dispatch({type:GET_TRANSACTION_SUCCESS, payload:res.data})
        const total = res.headers.get("x-total-count");
        funcTotalPage(Math.ceil(total / limit))
      })
     .catch((error) => {
      dispatch({type:GET_TRANSACTION_FAILURE})
    })
  };