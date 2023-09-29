import { GETSUBSREQUEST, GETSUBSFAILURE, GETSUBSSUCESS } from "./actionTypes";

const initState = {
  isLoading: false,
  isErro: false,
  subscriptions: [],
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case GETSUBSREQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case GETSUBSFAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case GETSUBSSUCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        subscriptions: action.payload,
      };
    default:
      return state;
  }
};
