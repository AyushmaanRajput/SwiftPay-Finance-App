import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { reducer as authReducer } from "./authReducer/reducer";
import { reducer as transactionsReducer } from "./admin/transactionsReducer/reducer";
import { reducer as userTransactionsReducer} from "./userTransactions/reducer"
import thunk from "redux-thunk";

const rootReducer = combineReducers({ authReducer, transactionsReducer,userTransactionsReducer });

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
