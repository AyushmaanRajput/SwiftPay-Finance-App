import { GET_ADMIN_TRANSACTION_FAILURE, GET_ADMIN_TRANSACTION_REQUEST, GET_ADMIN_TRANSACTION_SUCCESS, GET_SUPPORT_FAILURE, GET_SUPPORT_REQUEST, GET_SUPPORT_SUCCESS, POST_QUERY_FAILURE, POST_QUERY_REQUEST, POST_QUERY_SUCCESS } from "./actionTypes"

const initialState = {
    isLoading:false,
    isError:false,
    adminTransactions : [],
    support : []
}

export const reducer = (state=initialState,{type,payload}) => {
    switch(type){
        case GET_ADMIN_TRANSACTION_REQUEST : {
            return{...state,isLoading:true,isError:false}
        }
        case GET_ADMIN_TRANSACTION_SUCCESS : {
            return{...state,isLoading:false,isError:false,adminTransactions:payload}
        }
        case GET_ADMIN_TRANSACTION_FAILURE : {
            return{...state,isLoading:true,isError:true}
        }
        case GET_SUPPORT_REQUEST : {
            return{...state,isLoading:true,isError:false}
        }
        case GET_SUPPORT_SUCCESS : {
            return {...state,isLoading:false,isError:false,support : payload}
        }
        case GET_SUPPORT_FAILURE:{
            return {...state,isLoading:false,isError:true}
        }
        case POST_QUERY_REQUEST : {
            return {...state,isLoading:true,isError:false}
        }
        case POST_QUERY_SUCCESS :{
            return {...state,isLoading:false,isError:false}
        }
        case POST_QUERY_FAILURE : {
            return {...state,isLoading:false,isError:true}
        }

        default : 
        return state
    }
}