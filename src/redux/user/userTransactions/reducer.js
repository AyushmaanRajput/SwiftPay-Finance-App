import { GET_ADMIN_TRANSACTION_FAILURE, GET_ADMIN_TRANSACTION_REQUEST, GET_ADMIN_TRANSACTION_SUCCESS, GET_USERS_TRANSACTION_FAILURE, GET_USERS_TRANSACTION_REQUEST, GET_USERS_TRANSACTION_SUCCESS } from "./actionTypes"


export const initialState = {
    isLoading:false,
    isError:false,
    user : {},
    adminTransactions : []
}

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ADMIN_TRANSACTION_REQUEST : {
        return{...state,isLoading:true,isError:false}
    }
    case GET_ADMIN_TRANSACTION_SUCCESS : {
        return{...state,isLoading:false,isError:false,adminTransactions:payload}
    }
    case GET_ADMIN_TRANSACTION_FAILURE : {
        return{...state,isLoading:true,isError:true}
    }
    case GET_USERS_TRANSACTION_REQUEST : {
        return{...state,isLoading:true,isError:false}
    }
    
    case GET_USERS_TRANSACTION_SUCCESS : {
        return{...state,isLoading:false,isError:false,user:payload}
    }
    case GET_USERS_TRANSACTION_FAILURE : {
        return{...state,isLoading:false,isError:true}
    }
  default:
    return state
  }
}
