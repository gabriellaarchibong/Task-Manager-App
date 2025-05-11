import { useEffect, useState } from "react";
import { useLocation, Routes, Route } from "react-router-dom"
import Welcome from "../pages/Welcome";
import Create from "../pages/Create";
import Tasks from "../pages/Tasks";
import Progress from "../pages/Progress";
import Done from "../pages/Done";

function Content() {
	const location = useLocation();
	const [displayLocation, setDisplayLocation] = useState(location);
	const [transitionStage, setTransitionStage] = useState("fadeIn");

	useEffect(() => {
		if(location !== displayLocation) setTransitionStage("fadeOut");
	}, [location, displayLocation])

  return (
	<div className={transitionStage}
		onAnimationEnd={() => {
			if(transitionStage === "fadeOut"){
				setDisplayLocation(location)
				setTransitionStage("fadeIn")
			}
		}}
	>
		<Routes location={displayLocation}>
			<Route path="/" element={<Welcome />} />
			<Route path="/create" element={<Create />} />
			<Route path="/tasks" element={<Tasks/>} />
			<Route path="/progress" element={<Progress/>} />
			<Route path="/done" element={<Done/>} />
		</Routes>
		
	</div>
  )
}

export default Content