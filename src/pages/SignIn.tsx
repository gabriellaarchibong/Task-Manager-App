import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle, signUpWithEmail } from "../utils/firebaseAuth";
import BackgroundCircles from "../components/ui/BackgroundCircles";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "../redux/rootTypes";
import SkeletenUi from "../components/ui/SkeletenUi";
import { useAppDispatch } from "../redux/rootTypes";

function SignIn() {
  // const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState<string | null>(null);
  // useAppSelector((state) => [state.auth.user, state.auth.loading]);
  const loading = useAppSelector((state) => state.auth.loading);
  // const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const from = location.state?.from?.pathname || "/tasks";

  const handleSignWithEmail = async (formData: FormData) => {
    try {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      await signUpWithEmail(email, password, dispatch);
      navigate(from, { replace: true });
      
    } catch (error) {
      console.error("Error signing up:", error);
      setError( error instanceof Error ? error.message : "An error occurred, please try again" );
    }finally {
      console.log("finally");
    }
    
  };
  
  const signInWithGoogleRedirect = async () => {
    try {
      await signInWithGoogle(navigate, from);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An error occurred, please try again"
      );
      console.error("Error signing in with Google:", error);
    }
   
  };

  if (loading) {
    return <SkeletenUi />
  }; // Or your actual splash screen

  const color =
    "backdrop-blur-md border border-gray-200 dark:border-white/20 rounded-xl p-6 w-full max-w-md shadow-xl";
  return (
    <div className="relative min-h-screen flex items-center justify-center text-gray-800 dark:text-gray-100 px-4 py-10">

      <BackgroundCircles />
      <div className={color}>
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

        <form action={handleSignWithEmail} className="space-y-4 ">
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="w-full px-4 py-2 border border-gray-300 rounded outline-none "
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="w-full px-4 py-2 border border-gray-300 rounded outline-none "
            required
          />
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-yellow-300 hover:bg-yellow-400 focus:bg-yellow-700 text-gray-900 font-medium py-2 px-4 rounded transition cursor-pointer"
            disabled={loading}
            title="Sign Up"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
        <button
          onClick={signInWithGoogleRedirect}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-blue-300 focus:bg-blue-300 dark:hover:bg-blue-700 dark:focus:bg-blue-700 dark:text-white font-semibold py-2 px-4 rounded mb-4 shadow-sm transition cursor-pointer mt-2"
        >
          <FcGoogle /> Sign in with Google
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-300 focus:text-blue-300 font-semibold transition-colors duration-200"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
