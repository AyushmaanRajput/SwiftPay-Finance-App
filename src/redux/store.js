import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { reducer as authReducer } from "./authReducer/reducer";
import { reducer as transactionsReducer } from "./admin/transactionsReducer/reducer";
import { reducer as usersReducer } from "./user/usersReducer/reducer";
import { reducer as subscriptionsReducer } from "./user/subscriptionsReducer/reducer";
import { reducer as accountReducer } from "./user/usersReducer/accountReducer/reducer";
import { reducer as userQueryReducer } from "./user/userQuery/reducer";
import { reducer as supportReducer } from "./admin/SupportReducer/reducer";
import thunk from "redux-thunk";

export const baseURL = `https://warlike-current.onrender.com`;

const rootReducer = combineReducers({
  authReducer,
  transactionsReducer,
  usersReducer,
  subscriptionsReducer,
  supportReducer,
  accountReducer,
  userQueryReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
// Checking

