import { GETTRANSACTIONSFAILURE, GETTRANSACTIONSREQUEST, GETTRANSACTIONSSUCCESS, GET_TRANSACTION_FAILURE, GET_TRANSACTION_REQUEST, GET_TRANSACTION_SUCCESS } from "./actionTypes";

const initState = {
  transactions: [],
  allTransactions: [],
  isLoading : false,
  isError : false
};

export const reducer = (state = initState, {type,payload}) => {
  switch (type) {
    case GET_TRANSACTION_REQUEST : {
      return {...state,isLoading:true,isError:false}
    }
    case GET_TRANSACTION_SUCCESS : {
      return {...state,isLoading:false,isError:false,transactions:payload}
    }
    case GET_TRANSACTION_FAILURE : {
      return {...state,isError:true,isLoading:false}
    }
    case GETTRANSACTIONSREQUEST : {
      return{...state,isLoading:true, isError:false}
    }
    case GETTRANSACTIONSSUCCESS : {
        return{...state,isLoading:false, isError:false, allTransactions:payload}
    }
    case GETTRANSACTIONSFAILURE  : {
        return{...state,isLoading:true, isError:true}
    }
    default:
      return state;
  }
};
