import {createSlice} from "@reduxjs/toolkit";

// Customer initial state
const initialStateCustomer = {
	fullName: "",
	nationalID: "",
	createdAt: "",
};

const customerSlice = createSlice({
	name: "customer",
	initialState: initialStateCustomer,
	reducers: {
		createCustomer: {
			prepare(fullName, nationalID) {
				return {payload: {fullName, nationalID, createdAt: new Date().toISOString()}};
			},
			reducer(state, action) {
				if (action.payload.fullName === "" || action.payload.nationalID === "") return;
				state.fullName = action.payload.fullName;
				state.nationalID = action.payload.nationalID;
				state.createdAt = action.payload.createdAt;
			},
		},

		updateName(state, action) {
			state.fullName = action.payload;
		},
	},
});

export default customerSlice.reducer;
export const {createCustomer, updateName} = customerSlice.actions;
