
import { useAppSelector } from "../redux/rootTypes";
import { Navigate, Outlet } from "react-router-dom";
import SkeletenUi from "./ui/SkeletenUi";

function PublicRoute() {
	const user = useAppSelector((state) => state.auth.user);
	const authChecked = useAppSelector((state) => state.auth.isAuthChecked);
	// const location = useLocation();

	if (!authChecked) {
    return <SkeletenUi />; // Or your actual splash screen
  }
  // console.log(user)
  return  user ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PublicRoute