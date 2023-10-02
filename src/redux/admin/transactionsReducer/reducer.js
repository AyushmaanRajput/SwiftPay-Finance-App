import {
  GETTRANSACTIONSFAILURE,
  GETTRANSACTIONSREQUEST,
  GETTRANSACTIONSSUCCESS,
} from "./actionTypes";

const initState = {
  allTransactions: [],
  isLoading: false,
  isError: false,
};

export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case GETTRANSACTIONSREQUEST: {
      return { ...state, isLoading: true, isError: false };
    }
    case GETTRANSACTIONSSUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        allTransactions: payload,
      };
    }
    case GETTRANSACTIONSFAILURE: {
      return { ...state, isLoading: false, isError: true };
    }
    default:
      return state;
  }
};
