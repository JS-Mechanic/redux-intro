import {createSlice} from "@reduxjs/toolkit";

// Account initial state
const initialStateAccount = {
	balance: 0,
	loan: 0,
	loanPurpose: "",
	isLoading: false,
};

const accountSlice = createSlice({
	name: "account",
	initialState: initialStateAccount,
	reducers: {
		deposit(state, action) {
			state.balance += action.payload;
			state.isLoading = false;
		},

		withdraw(state, action) {
			state.balance -= action.payload;
		},

		requestLoan: {
			prepare(amount, purpose) {
				return {payload: {amount, purpose}};
			},
			reducer(state, action) {
				if (state.loan > 0) return;
				state.loan = action.payload.amount;
				state.loanPurpose = action.payload.purpose;
				state.balance += action.payload.amount;
			},
		},

		payLoan(state) {
			if (state.balance < state.loan) return;
			state.balance -= state.loan;
			state.loan = 0;
			state.loanPurpose = "";
		},

		convertingCurrency(state) {
			state.isLoading = true;
		},
	},
});

export default accountSlice.reducer;
export const {withdraw, requestLoan, payLoan} = accountSlice.actions;

export function deposit(amount, currency) {
	if (currency === "USD") return {type: "account/deposit", payload: amount};
	return async function (dispatch) {
		dispatch({type: "account/convertingCurrency"});
		const res = await fetch(
			`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`,
		);
		const data = await res.json();
		const converted = data.rates.USD;
		dispatch({type: "account/deposit", payload: converted});
	};
}
