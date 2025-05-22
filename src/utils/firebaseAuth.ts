import {
	 createUserWithEmailAndPassword,
	 signInWithEmailAndPassword,
	 signInWithPopup,
	 signInWithRedirect,
	 GoogleAuthProvider,
	 signOut,
	 } from "firebase/auth";
import { auth } from "./firestore";
import toast from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";
import { getUserDocument, handleNewUser, setAuthUser } from "./db";
import { setError, setLoadingStatus} from "../redux/features/auth/authSlice";
import { ensureUserDocumentExists } from "./db";


const getAuthErrorMessage = (error: unknown): string => {
  if (typeof error === 'object' && error !== null) {
    const authError = error as { code?: string; message?: string };
    
    switch (authError.code) {
      case 'auth/popup-closed-by-user':
        return 'You closed the sign-in window';
      case 'auth/cancelled-popup-request':
        return 'Multiple popup attempts detected';
      case 'auth/account-exists-with-different-credential':
        return 'Account exists with different method';
      default:
        return authError.message || 'Unknown error occurred';
    }
  }
  return 'Unknown error occurred';
};




export const signUpWithEmail = async (email: string, password: string, dispatch: (action: any) => void) => {
	try {
		dispatch(setLoadingStatus());
    
    // Create auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Handle user document
    const isNewUser = await ensureUserDocumentExists(user, 'email');
    const userDoc = await getUserDocument(user.uid);

    // Update Redux
    	dispatch(setAuthUser(user, userDoc, isNewUser));
		return user;
		
	} catch (error) {
		console.log("Error signing up with email:", error)
		toast.error("Sign up failed")
		const errorMessage = getAuthErrorMessage(error);
		dispatch(setError(errorMessage));
		throw new Error(errorMessage);
  	}finally{
		// dispatch(setLoadingStatus());
		console.log("finally");
	}
}
	


export const signInWithEmail = async (email: string, password: string) => {
	const result = await signInWithEmailAndPassword(auth, email, password)
	if (result?.user) {
		await handleNewUser(result.user);
		toast.success("Signed in successfully");
	} else {
		toast.error("Sign in failed");
	}
}


export const signInWithGoogle = async (navigate: NavigateFunction, pathname: string) => {
	const provider = new GoogleAuthProvider()

	const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
	try {
		if(isMobile){
			await signInWithRedirect(auth, provider)
			// Handle the redirect result when user returns
		}
			// For desktop, use signInWithPopup
		const result = await signInWithPopup(auth, provider)
		if (result?.user) {
      		await handleNewUser(result.user);
      		toast.success("Signed in successfully");
      		navigate(pathname, { replace: true });
    	}
			
	} catch (error) {
		console.error("Google sign-in error:", error);
    	const errorMessage = getAuthErrorMessage(error);
		throw new Error(errorMessage);
    
	}
}

export const logOut = async () => {
  try {
    await signOut(auth); // sign out from Firebase
	toast.success("Logged out successfully");
  } catch (error) {
    console.error("Logout failed", error);
	toast.error("Logout failed");
  }
};

// export const handleRedirectResult = async (navigate: NavigateFunction, pathname: string) => {
// 	try {
// 		const result = await getRedirectResult(auth);
// 		if (result?.user) {
// 		toast.success("Signed in successfully");
// 		navigate(pathname, {replace: true}); // Redirect to the create task page
// 		}
//   } catch (error) {
// 		console.error("Redirect error:", error);
// 		toast.error("Redirect sign-in failed");
//   }
// }