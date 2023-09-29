import axios from "axios";
import { GET_ADMIN_TRANSACTION_FAILURE, GET_ADMIN_TRANSACTION_REQUEST, GET_ADMIN_TRANSACTION_SUCCESS, GET_USERS_TRANSACTION_FAILURE, GET_USERS_TRANSACTION_REQUEST, GET_USERS_TRANSACTION_SUCCESS } from "./actionTypes";


export const adminTransactionsData = (dispatch) => {
     dispatch({type:GET_ADMIN_TRANSACTION_REQUEST})
      axios
      .get(`https://warlike-current.onrender.com/transactions`)
      .then((res)=> {
        dispatch({type:GET_ADMIN_TRANSACTION_SUCCESS, payload:res.data})
      })
     .catch((error) => {
      dispatch({type:GET_ADMIN_TRANSACTION_FAILURE})
    })
  };

  export const userTransactionsData = (dispatch) => {
    dispatch({type:GET_USERS_TRANSACTION_REQUEST})
     axios
     .get(`https://warlike-current.onrender.com/users/1`)
     .then((res)=> {
       dispatch({type:GET_USERS_TRANSACTION_SUCCESS, payload:res.data.transactions})
     })
    .catch((error) => {
     dispatch({type:GET_USERS_TRANSACTION_FAILURE})
   })
 };  