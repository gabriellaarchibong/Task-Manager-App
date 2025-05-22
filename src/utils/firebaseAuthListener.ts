// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./firestore";
// import { setUser, clearUser, setLoadingStatus } from "../redux/features/auth/authSlice";
// import type { AppDispatch } from "../redux/store";

// import { createUserDocument } from "./db";

// export const firebaseAuthListener = (dispatch: AppDispatch) => {
//   // Notify app that we're checking the auth state
//   dispatch(setLoadingStatus(true));

//   return onAuthStateChanged(auth, async (user) => {
//     try {
//       console.log("User state changed:", user);
//       if (user) {
//         const { uid, email, displayName, photoURL } = user;

//         await createUserDocument({ uid, email, displayName });
//         dispatch(
//           setUser({
//             uid,
//             email,
//             displayName,
//             photoURL: photoURL || null,
//           })
//         );
//       } else {
//         dispatch(clearUser());
//       }
//     } catch (error) {
//       console.error("Error in firebaseAuthListener:", error);
//       // dispatch(clearUser());
//     } finally {
//       dispatch(setLoadingStatus(false)); // Make sure this always runs
//     }
//   });
// };