import { GET_DATA, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCESS } from "./actionType";
const initState = {
  isLoading: false,
  isError: false,
  isAuth: false,
  edit:false,
  userDetails: [],
};
export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
      return { ...state, isLoading: true };
    case LOGIN_SUCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isAuth: true,
        // userDetails: payload,
      };
    case LOGIN_FAIL:
      return { ...state, isError: true };
    default:
      return state;
  }
};
