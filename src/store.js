import {combineReducers, createStore} from "redux";
import AccountReducer from "./features/accounts/accountSlice.js";
import customerReducer from "./features/customers/customerSlice.js";

const rootReducer = combineReducers({account: AccountReducer, customer: customerReducer});
const store = createStore(rootReducer);

export default store;
