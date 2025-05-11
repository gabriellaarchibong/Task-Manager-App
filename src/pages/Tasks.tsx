import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import Taskitem from "../components/Taskitem";
import type { Task } from "../types";
import { useEffect, useState } from "react";
import { updateTaskStatus, listenToTasks, deleteTask } from "../utils/service";
import toast from "react-hot-toast";

function Tasks() {
  const [task, setTask] = useState<Task[]>([]);

  useEffect(() => {
    const unsubscribe = listenToTasks(setTask);
    return () => unsubscribe();
  }, []);

  const handleTaskCheck = async (taskId: string, completed: boolean) => {
    setTask((tasks) =>
      tasks.map((task) => (task.id === taskId ? { ...task, completed } : task))
    );
    await updateTaskStatus(taskId, completed);
  };

  const handleDelete = async (taskId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (!confirmed) return;

    try {
      await deleteTask(taskId);
      toast.success("Task deleted");
      // Optionally refetch tasks or update local state
      setTask((prev) => prev.filter((task) => task.id !== taskId));

    } catch (error) {
      toast.error("Failed to delete task");
      console.error("failed to delete data:", error)
    }
  }

  return (
    <Layout>
      <div className="flex gap-2 mb-4">
        <button className="p-2 px-3 bg-green-200 flex rounded-full text-black">
          Todo
        </button>
        <Link to="/progress" className="p-2 px-3 bg-gray-800 flex rounded-full text-white">
          In Progress
        </Link>
        <Link to='/done' className="p-2 px-3 bg-gray-800 flex rounded-full text-white">
          Done
        </Link>

        <Link
          to="/create"
          className="bg-yellow-200 flex rounded-full h-fit my-auto p-2 
        text-black ml-auto"
        >
          <IoAdd className="text-xl" />
        </Link>
      </div>

      {/* tasks */}
      <div className="space-y-2">
        {task.map((task: Task, index: number) => (
          <Taskitem
            id={task.id}
            key={index + "task"}
            body={task.body}
            isCompleted={task.isCompleted}
            priority={task.priority}
            onCheck={(isCompleted) => handleTaskCheck(task.id, isCompleted)}
            onDelete= {() => handleDelete(task.id)}
          />
        ))}
      </div>
    </Layout>
  );
}

export default Tasks;
