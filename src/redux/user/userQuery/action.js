import axios from "axios"
import { POST_QUERY_FAILURE, POST_QUERY_REQUEST, POST_QUERY_SUCCESS } from "./actionTypes"


export const handlePostQueryForm = (dispatch) => {
  dispatch({type:POST_QUERY_REQUEST})
  axios
  .post(`https://warlike-current.onrender.com/supports`)
  .then((res)=>dispatch({type:POST_QUERY_SUCCESS}))
  .catch((error)=>dispatch({type:POST_QUERY_FAILURE}))
}

