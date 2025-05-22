import defaultProfile from "../assets/default-profile.svg"
import { useAppSelector } from "../redux/rootTypes";
import { logOut } from "../utils/firebaseAuth";
import { Link } from "react-router-dom";
import BackgroundCircles from "../components/ui/BackgroundCircles";


const Profile = () => {
  const user = useAppSelector((state) => state.auth.user);
//   const navigate = useNavigate();
  
	const extractNameFromEmail = (email: string | null | undefined) => {
		if (!email) return "";
		return email.split("@")[0];
	};

	const handleLogout = async() => {
		await logOut()
	};

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
		<BackgroundCircles />
      <div className="dark:bg-[#1a1a1a] rounded-xl shadow-lg p-8 max-w-md w-full space-y-6 animate-fadeIn">
        <div className="flex flex-col items-center">
          <img
            src={user?.photoURL || defaultProfile}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-[#B9F8CF] shadow-md"
          />
          <h2 className="text-xl font-semibold mt-4 text-gray-500 dark:text-gray-100">{user?.displayName || extractNameFromEmail(user?.email)}</h2>
          <p className="text-gray-400">{user?.email || "No Email"}</p>
        </div>

        <div className="w-full border-t border-gray-700 pt-6">
          <button
            onClick={handleLogout}
            className="w-full bg-[#B9F8CF] hover:bg-[#9ee5b3] text-black font-semibold py-2 px-4 rounded-lg transition duration-200 cursor-pointer"
          >
            Log Out
          </button>
		  <Link to="/tasks">
				<button
			  		className="w-full bg-[#B9F8CF] hover:bg-[#9ee5b3] text-black font-semibold py-2 px-4 rounded-lg transition duration-200 mt-4 cursor-pointer"
			>
			  		Go to Tasks
				</button>
		  </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
