import { useAppSelector } from "../redux/rootTypes"
import { Outlet, Navigate } from "react-router-dom";
import SkeletenUi from "./ui/SkeletenUi";

function AuthRequired() {
	const user = useAppSelector((state) => state.auth.user);
	const loading = useAppSelector((state) => state.auth.loading);
	
	// const location = useLocation();
	if (loading) {
		return <SkeletenUi />;
	}
	
	// if (!user) {
	// 	return <Navigate to="/login" state={{ from: location }} replace />;
	// }
  	// return <Outlet />;

	return user ? <Outlet /> : <Navigate to="/login" replace />;

	
}

export default AuthRequired