import { Dispatch } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { clearUser, setError, setUser } from "../redux/features/auth/authSlice";


export const updateAuthState = (dispatch: Dispatch, user: User | null, error: Error | null = null) => {
	if (error) {
		console.error("Error updating auth state:", error);
		return dispatch(setError(error.message));
	}
	if (user) {
		dispatch(setUser({
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
			photoURL: user.photoURL
		}));
	}else {
		dispatch(clearUser());
	}  
};