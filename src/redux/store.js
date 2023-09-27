import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { reducer as authReducer } from "./authReducer/reducer";
import { reducer as transactionsReducer } from "./admin/transactionsReducer/reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({ authReducer, transactionsReducer });

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
