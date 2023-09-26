import {
  POSTLOGINREQUEST,
  POSTLOGINFAIL,
  POSTLOGINSUCCESS,
} from "./actionTypes";

const initState = {
  isLoading: false,
  isError: false,
  isAuth: false,
  token: null,
  isAdmin:true,
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case POSTLOGINREQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case POSTLOGINFAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case POSTLOGINSUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isAuth: true,
        token: action.payload,
      };
    default:
      return state;
  }
};
