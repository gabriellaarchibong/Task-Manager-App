import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { addTask } from "../utils/db";
import toast from "react-hot-toast";
import { useFormStatus } from "react-dom";
import { useAppSelector } from "../redux/rootTypes";

function Create() {
  const [bodyError, setBodyError] = useState<string | null>(null);
  const [priorityError, setPriorityError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const user = useAppSelector((state) => state.auth.user);

  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (!pending && formRef.current) {
      formRef.current.reset();
    }
  }, [pending]);

  const handleForm = async (formData: FormData) => {
    if (!user) return;
    setBodyError(null);
    setPriorityError(null);

    const body = formData.get("body");
    const priorityValue = formData.get("priority");

    if (typeof body !== "string" || body.trim() === "") {
      setBodyError("Task description is required");
      return;
    }

    if (typeof priorityValue !== "string" || isNaN(parseFloat(priorityValue))) {
      setPriorityError("Priority must be a valid number");
      return;
    }

    const priority = parseFloat(priorityValue);

    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay
      await addTask(user, { body, priority });
      setIsLoading(false);
      toast.success("New task added");
    } catch (error) {
      if (!navigator.onLine) {
        toast.success("Success! Task has been saved offline.");
      } else {
        setBodyError(
          error instanceof Error ? error.message : "Something went wrong"
        );
        toast.error("An error occurred");
      }
    }
  };

  const inputClassName =
    "border w-full mb-2 border-solid border-gray-200 dark:border-gray-400 bg-transparent p-3 rounded-xl text-gray-800 dark:text-gray-100 focus:outline-none focus:border-yellow-300 focus:ring-1 focus:ring-yellow-300 transition duration-200 ease-in-out";

  return (
    <Layout>
      <form action={handleForm} ref={formRef} className="space-y-2">
        <div className="flex justify-start mb-20  text-gray-800 dark:text-gray-100">
          <Link to="/tasks" className="mt-4 w-full mr-auto flex gap-2">
            <IoArrowBack className="my-auto text-xl" /> Back
          </Link>
        </div>

        <div>
          <input
            type="text"
            name="body"
            placeholder="Add a Task..."
            className={inputClassName}
          />
          {bodyError && <p style={{ color: "red" }}>{bodyError}</p>}
        </div>

        <div>
          <input
            type="number"
            name="priority"
            className={inputClassName}
            placeholder="priority: 1"
          />
          {priorityError && <p style={{ color: "red" }}>{priorityError}</p>}
        </div>

        <div className="flex">
          <button
            type="submit"
            className="dark:bg-yellow-200 dark:hover:bg-yellow-300 bg-amber-300 hover:bg-amber-400 transition rounded-full py-3 w-40 text-black mx-auto cursor-pointer"
          >
            {isLoading ? "Loading" : "Submit"}
          </button>
        </div>
      </form>
    </Layout>
  );
}

export default Create;
