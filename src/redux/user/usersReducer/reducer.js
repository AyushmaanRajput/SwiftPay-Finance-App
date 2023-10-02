import {
  GETUSERSREQUEST,
  GETUSERSFAILURE,
  GETUSERSSUCCESS,
  PATCHUSERSFAILURE,
  PATCHUSERSSUCCESS,
  PATCHUSERSREQUEST,
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
    case PATCHUSERSREQUEST:
      return {
        ...state,
        isLoading: true,
        isErorr: false,
      };
    case PATCHUSERSSUCCESS:
      let dup = [...state.users];
      for (let i = 0; i < dup.length; i++) {
        if (dup[i].id === action.payload.id) {
          dup[i] = action.payload;
        }
      }
      return {
        ...state,
        isLoading: false,
        isErorr: false,
        users: [...dup],
      };
    case PATCHUSERSFAILURE:
      return {
        ...state,
        isLoading: false,
        isErrorr: false,
      };
    default:
      return state;
  }
};
