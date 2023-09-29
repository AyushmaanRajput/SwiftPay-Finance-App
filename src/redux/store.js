import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { reducer as authReducer } from "./authReducer/reducer";
import { reducer as transactionsReducer } from "./admin/transactionsReducer/reducer";
import { reducer as userTransactionsReducer } from "./userTransactions/reducer";
import { reducer as usersReducer } from "./user/usersReducer/reducer";
import { reducer as accountReducer } from "./user/usersReducer/accountReducer/reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  authReducer,
  transactionsReducer,
  usersReducer,
  userTransactionsReducer,
  accountReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
// Checking
