import { POST_QUERY_FAILURE, POST_QUERY_REQUEST, POST_QUERY_SUCCESS } from "./actionTypes";

const initialState = {
    isLoading : false,
    isError : false
}
export const reducer = (state=initialState,{type,payload}) => {
    switch(type){
        case POST_QUERY_REQUEST:{
            return {...state,isloading : true,isError:false}
        }
        case POST_QUERY_FAILURE : {
            return {...state,isLoading:false,isError:true}
        }
        case POST_QUERY_SUCCESS : {
            return {...state,isLoading:false,isError:false}
        }
        default : {
            return state
        }
    }
}