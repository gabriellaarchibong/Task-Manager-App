import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "../../../types/authType";
export const completeAuthLoading = createAction('auth/loadingComplete');

const initialState: AuthState = {
	user: null,
	loading: true,
	isAuthChecked: false,
	status: 'idle',
	error: null,
}

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<AuthState ['user']>){
			state.user = action.payload;
      		state.status = 'succeeded';
      		state.error = null;
      		state.isAuthChecked = true;
		},
		setError: (state, action) => {
      		state.error = action.payload;
      		state.status = 'failed';
      		state.isAuthChecked = true;
    	},
		clearUser(state){
			state.user = null;
      		state.status = 'idle';
      		state.error = null;
      		state.isAuthChecked = true;
		},
		setLoadingStatus(state) {
	  		state.status = 'loading';
    	},
		authChecked: (state) => {
      		state.isAuthChecked = true;
    	},
	},
	extraReducers: (builder) => {
		builder
			.addCase(completeAuthLoading, (state) => {
				state.loading = false;
			})
	}

})

export const { setUser, clearUser, setLoadingStatus, authChecked, setError } = authSlice.actions
export default authSlice.reducer