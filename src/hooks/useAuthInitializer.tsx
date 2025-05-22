import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firestore";
import { useEffect } from "react";
import { useAppDispatch } from "../redux/rootTypes";
import {
  setUser,
  clearUser,
  setLoadingStatus,
} from "../redux/features/auth/authSlice";

function useAuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoadingStatus());
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(
          setUser({
            uid,
            email,
            displayName,
            photoURL: user.photoURL || null,
          })
        );
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
}

export default useAuthInitializer;
