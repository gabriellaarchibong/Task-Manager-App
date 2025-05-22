import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import Taskitem from "../components/Taskitem";
import type { Task } from "../types";
import { useEffect, useState } from "react";
import { updateTaskStatus, listenToTasks, deleteTask } from "../utils/db";
import toast from "react-hot-toast";
import { useAppSelector } from "../redux/rootTypes";
import defaultAvatar from "../assets/default-profile.svg";

function Tasks() {
  const [task, setTask] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = listenToTasks(user?.uid, setTask);
    setLoading(false);
    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  const handleTaskCheck = async (taskId: string, completed: boolean) => {
    if (!user) return;
    setTask((tasks) =>
      tasks.map((task) => (task.id === taskId ? { ...task, completed } : task))
    );
    await updateTaskStatus(user?.uid, taskId, {
      isCompleted: completed,
    });
  };

  const handleDelete = async (taskId: string) => {
    if (!user) return;
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmed) return;

    try {
      await deleteTask(user.uid, taskId);
      toast.success("Task deleted");
      setTask((prev) => prev.filter((task) => task.id !== taskId));
    } catch (error) {
      toast.error("Failed to delete task");
      console.error("failed to delete data:", error);
    }
  };

  return (
    <Layout>
      <div className="flex gap-2 mb-4">
        <Link
          to="/profile"
          className="p-1 w-10 h-10 overflow-hidden items-center justify-center bg-green-200  flex rounded-full text-black"
        >
          <div className="w-full h-full rounded-full overflow-hidden">
            <img
              className="object-cover w-full h-full"
              src={user?.photoURL || defaultAvatar}
              alt="profile avatar"
            />
          </div>
        </Link>
        <Link
          to="/progress"
          className="p-2 px-3 bg-gray-800 dark:bg-gray-950 flex rounded-full text-white"
        >
          In Progress
        </Link>
        <Link
          to="/done"
          className="p-2 px-3 bg-gray-800 dark:bg-gray-950 flex rounded-full text-white"
        >
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
            onDelete={() => handleDelete(task.id)}
          />
        ))}
      </div>
    </Layout>
  );
}

export default Tasks;
