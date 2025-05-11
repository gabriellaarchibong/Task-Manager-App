import { Link } from "react-router-dom"
import { IoArrowBack } from "react-icons/io5";

function Progress() {
  return (
	<div className="flex flex-col justify-center items-center p-4">
		<h1 className="text-2xl font-bold">This page is still in development</h1><br />
		<Link to="/tasks">
		   <div className="flex gap-2 items-center">
				<IoArrowBack />
				<strong>Back to tasks page</strong> 
			</div>
		</Link>
	</div>
  )
}

export default Progress