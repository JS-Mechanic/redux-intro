import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import AccountReducer from "./features/accounts/accountSlice.js";
import customerReducer from "./features/customers/customerSlice.js";

const rootReducer = combineReducers({account: AccountReducer, customer: customerReducer});
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
