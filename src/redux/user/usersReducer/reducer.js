import {
  GETUSERSREQUEST,
  GETUSERSFAILURE,
  GETUSERSSUCCESS,
} from "./actionTypes";
const initState = {
  isLoading: false,
  isErorr: false,
  users: [],
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case GETUSERSREQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case GETUSERSFAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case GETUSERSSUCCESS:
      return {
        ...state,
        isLoading: false,
        isErorr: false,
        users: action.payload,
      };
    default:
      return state;
  }
};
