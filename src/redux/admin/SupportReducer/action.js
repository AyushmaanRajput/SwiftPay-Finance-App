import axios from "axios";
import { GET_ADMIN_TRANSACTION_FAILURE, GET_ADMIN_TRANSACTION_REQUEST, GET_ADMIN_TRANSACTION_SUCCESS, GET_SUPPORT_FAILURE, GET_SUPPORT_REQUEST, GET_SUPPORT_SUCCESS, POST_QUERY_FAILURE, POST_QUERY_REQUEST, POST_QUERY_SUCCESS } from "./actionTypes";



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
 

export const postQuery = (queryObj) => (dispatch) => {
    dispatch({type:POST_QUERY_REQUEST})
    axios
    .post(`https://mock-api-finpay.onrender.com/supports`,queryObj)
    .then((res)=>{
      console.log(res)
      dispatch({type:POST_QUERY_SUCCESS})
    })
    .catch((error)=>dispatch({type:POST_QUERY_FAILURE}))
} 

export const supportData = (dispatch) => {
    dispatch({type:GET_SUPPORT_REQUEST})
    axios
      .get('https://warlike-current.onrender.com/supports')
      .then((res) => {
        dispatch({type:GET_SUPPORT_SUCCESS,payload:res.data})
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        dispatch({type:GET_SUPPORT_FAILURE})
      });
}