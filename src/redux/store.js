import { legacy_createStore, applyMiddleware } from "redux";
import { reducer as authReducer } from "./authReducer/reducer";
import thunk from "redux-thunk";

export const store = legacy_createStore(authReducer, applyMiddleware(thunk));
