import {
  POSTLOGINREQUEST,
  POSTLOGINFAIL,
  POSTLOGINSUCCESS,
  POSTADMINSUCESS,
  UPDATELOGGEDINUSER,
  LOGOUT,
} from "./actionTypes";

const initState = {
  isLoading: false,
  isError: false,
  isAuth: false,
  isAdmin: false,
  loggedInUser: null,
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
        loggedInUser: action.payload,
      };
    case POSTADMINSUCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isAuth: true,
        isAdmin: true,
        loggedInUser: null,
      };
    case UPDATELOGGEDINUSER:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isAuth: true,
        isAdmin: false,
        loggedInUser: action.payload,
      };
    case LOGOUT:
      return {
        ...initState,
      };
    default:
      return state;
  }
};
