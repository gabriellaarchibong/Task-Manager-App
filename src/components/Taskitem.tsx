import toast from "react-hot-toast";
import type { TaskItemProps } from "../types";
import { MdComment } from "react-icons/md";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

function Taskitem({body, priority, isCompleted, onCheck, onDelete }: TaskItemProps) {
	const [isTaskCompleted, setIstaskCompleted] = useState(isCompleted)
	const syncCheck = async (completed: boolean) => {
		console.log("testing for stuff in the service worker");
		try {
		//   await editTask(id, taskCompleted);
		  onCheck(completed);
		  setIstaskCompleted(completed)
		  
		  toast.success("Saved the changes!");
		} catch (err) {
			// onCheck(taskCompleted);
		//   if (!navigator.onLine) {
			
		// 	return toast.success(
		// 	  "You're offline! changes will be synced when you're online again."
		// 	);
		//   }
		  toast.error("Failed to save changes!");
		  console.error("failed to save to database",err)
		}
	  };
	
	const handleCheck = async () => {
		// onCheck(!isCompleted);
		await syncCheck(!isCompleted)
		
		console.log(!isCompleted)
	};
	
	return (
		<div className="group relative bg-[#1f1f1f] p-5 w-full rounded-xl" tabIndex={0}>
			<p className="text-gray-400 text-xs">Priority: {priority}</p>
			<div className="flex w-full mt-2 justify-between">
			<p className="flex grow text-gray-200 text-xl">{body}</p>
			<input
				onChange={() => handleCheck()}
				checked={isTaskCompleted}
				type="checkbox"
				className="m-5 h-5 inline-block my-auto cursor-pointer"
			/>
			</div>

			<div className=" mt-4 w-fit ml-auto flex gap-2">
				<FaTrash
					onClick={onDelete}
					className="absolute top-2 text-red-500 opacity-0 group-hover:opacity-100 group-focus:opacity-100 cursor-pointer transition-opacity"
					size={18}
					title="Delete Task"
					role="button"
					aria-label="Delete Task"
				/>
				<div className="text-sm flex">
					<MdComment className="my-auto mr-2" />
					<span className="inline-block my-auto">4</span>
				</div>
			</div>

		</div>
	);

}

export default Taskitem