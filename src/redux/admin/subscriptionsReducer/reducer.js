import {
  GETSUBSREQUEST,
  GETSUBSFAILURE,
  GETSUBSSUCESS,
  ADDSUBREQUEST,
  ADDSUBFAILURE,
  ADDSUBSUCCESS,
  DELETESUBREQUEST,
  DELETESUBSUCCESS,
  DELETESUBFAILURE,
  EDITSUBREQUEST,
  EDITSUBFAILURE,
  EDITSUBSUCCESS,
} from "./actionTypes";

const initState = {
  isLoading: false,
  isError: false,
  subscriptions: [],
};

export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
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
        subscriptions: payload,
      };
    case ADDSUBREQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case ADDSUBFAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case ADDSUBSUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        subscriptions: [...state.subscriptions, payload],
      };
    case DELETESUBREQUEST:
      return {
       ...state,
        isLoading: true,
        isError: false,
      };
    case DELETESUBFAILURE:
      return {
      ...state,
        isLoading: false,
        isError: true,
      };
    case DELETESUBSUCCESS:
      return {
        ...state,
        isError: false,
        isLoading: false,
        subscriptions: state.subscriptions.filter(
          (subscription) => subscription._id!== payload.id
        ),
      }
    case EDITSUBREQUEST:
      return {
        ...state,
        isError: false,
        isLoading: false,
      }
    case EDITSUBFAILURE:
      return {
        isError: true,
        isLoading: false,
      }
    case EDITSUBSUCCESS:
      return {
        isError: false,
        isLoading: false,
        subscriptions: state.subscriptions.map((ele) => ele.id == payload.id ? payload : ele)
      }
    default:
      return state;
  }
};
