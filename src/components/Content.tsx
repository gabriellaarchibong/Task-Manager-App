import { useEffect, useState } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
// import { handleRedirectResult } from "../utils/firebaseAuth";
import AuthRequired from "./AuthRequired"
import PublicRoute from "./PublicRoute";
import Welcome from "../pages/Welcome";
import Create from "../pages/Create";
import Tasks from "../pages/Tasks";
import Progress from "../pages/Progress";
import Done from "../pages/Done";
import SignIn from "../pages/SignIn";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";

function Content() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");
  // const navigate = useNavigate();
  // const from = location.state?.from?.pathname || "/tasks"; 

  useEffect(() => {
		if(location !== displayLocation) setTransitionStage("fadeOut");
	}, [location, displayLocation])


  return (
    <div
      className={transitionStage}
      onAnimationEnd={() => {
        if (transitionStage === "fadeOut") {
          setDisplayLocation(location);
          setTransitionStage("fadeIn");
        }
      }}
    >
		<Routes location={displayLocation}>
			<Route element={<PublicRoute />}>
				<Route path="/" element={<Welcome />} />
				<Route path="/signup" element={<SignIn />} />
				<Route path="/login" element={<Login />} />
			</Route>
			<Route element={<AuthRequired />}>
				<Route path="/create" element={<Create />} />
				<Route path="/tasks" element={<Tasks />} />
				<Route path="/progress" element={<Progress />} />
				<Route path="/done" element={<Done />} />
				<Route path="/profile" element={<Profile />} />
			</Route>
			<Route path="*" element={<NotFound />} />
		</Routes>
    </div>
  );
}

export default Content;
