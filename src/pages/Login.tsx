import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle, signInWithEmail } from "../utils/firebaseAuth";
import BackgroundCircles from "../components/ui/BackgroundCircles";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "../redux/rootTypes";
import toast from "react-hot-toast";
import SkeletenUi from "../components/ui/SkeletenUi";

function Login() {
	const [error, setError] = useState<string | null>(null);
	const [ isloading, setIsLoading ] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const loading = useAppSelector((state) => state.auth.loading);
	const from = location.state?.from?.pathname || "/tasks";

	const signInWithEmailResult = async(formData: FormData) => {
	try {
		setError(null);
		setIsLoading(true);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		await signInWithEmail(email, password);
		toast.success("Logged in successfully");
		navigate(from, { replace: true });
		
	} catch (error) {
		setError(
			error instanceof Error ? error.message : "Something went wrong"
		);
		if (!navigator.onLine) {
			setError("You are offline. Please check your internet connection.");
		}
	}finally {
		setIsLoading(false);
	}
    
  };

  const signInWithGoogleResult = async () => {
	try {
		setError(null);
		await signInWithGoogle(navigate, from);
	} catch (error) {
		setError(
			error instanceof Error ? error.message : "Something went wrong"
		);
		if (!navigator.onLine) {
			setError("You are offline. Please check your internet connection.");
		}
		
	}
   
  };

  if (loading) {
	return <SkeletenUi />; // Or your actual splash screen
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center text-gray-800 dark:text-gray-100">
      <BackgroundCircles />
      <div className="backdrop-blur-md border border-gray-200 dark:border-white/20 rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <form action={signInWithEmailResult} className="space-y-4">
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
			<p className="text-red-500 text-sm text-center">{error}</p>
		  )}
          <button
            type="submit"
            className="w-full bg-yellow-300 hover:bg-yellow-400 focus:bg-yellow-700 text-gray-900 font-medium py-2 px-4 rounded transition cursor-pointer"
          >
            {isloading ? "Loading... " : "Login"}
          </button>
        </form>

        <button
          onClick={signInWithGoogleResult}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-blue-300 focus:bg-blue-300 dark:hover:bg-blue-700 dark:focus:bg-blue-700 dark:text-white font-semibold py-2 px-4 rounded mb-4 shadow-sm transition cursor-pointer mt-2"
        >
          <FcGoogle /> Login with Google
        </button>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 hover:text-blue-300 focus:text-blue-300 font-semibold transition-colors duration-200"
          >
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
