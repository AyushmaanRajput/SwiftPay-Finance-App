import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { reducer as authReducer } from "./authReducer/reducer";
import { reducer as transactionsReducer } from "./admin/transactionsReducer/reducer";
import { reducer as usersReducer } from "./user/usersReducer/reducer";
import { reducer as subscriptionsReducer } from "./admin/subscriptionsReducer/reducer";
import { reducer as accountReducer } from "./user/usersReducer/accountReducer/reducer";
import { reducer as userTransactionsReducer} from "./user/userTransactions/reducer"
import { reducer as userQueryReducer } from "./user/userQuery/reducer";
import thunk from "redux-thunk";

export const baseURL = `http://localhost:8080`;

const rootReducer = combineReducers({
  authReducer,
  transactionsReducer,
  usersReducer,
  userTransactionsReducer,
  subscriptionsReducer,
  accountReducer,
  userQueryReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
// Checking

