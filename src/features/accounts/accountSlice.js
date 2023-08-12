// Account initial state
const initialStateAccount = {
	balance: 0,
	loan: 0,
	loanPurpose: "",
	isLoading: false,
};

// Account reducer function
export default function AccountReducer(state = initialStateAccount, action) {
	switch (action.type) {
		case "account/deposit":
			return {...state, balance: state.balance + action.payload, isLoading: false};
		case "account/withdrawal":
			return {...state, balance: state.balance - action.payload};
		case "account/requestLoan":
			if (state.loan > 0) return state;
			return {
				...state,
				loan: action.payload.amount,
				loanPurpose: action.payload.purpose,
				balance: state.balance + action.payload.amount,
			};
		case "account/payLoan":
			return {...state, loan: 0, loanPurpose: "", balance: state.balance - state.loan};
		case "account/convertingCurrency":
			return {...state, isLoading: true};
		default:
			return state;
	}
}

// Account action creator functions
export function deposit(amount, currency) {
	if (currency === "USD") return {type: "account/deposit", payload: amount};
	return async function (dispatch, getState) {
		dispatch({type: "account/convertingCurrency"});
		// API Call
		const res = await fetch(
			`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`,
		);
		const data = await res.json();
		const converted = data.rates.USD;
		// Return Action
		dispatch({type: "account/deposit", payload: converted});
	};
}

export function withdrawal(amount) {
	return {type: "account/withdrawal", payload: amount};
}

export function requestLoan(amount, purpose) {
	return {type: "account/requestLoan", payload: {amount: amount, purpose: purpose}};
}

export function payLoan() {
	return {type: "account/payLoan"};
}
