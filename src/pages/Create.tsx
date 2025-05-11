import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { addTask } from "../utils/service";
import toast from "react-hot-toast";
import { useFormStatus } from "react-dom";

function Create() {
  const [bodyError, setBodyError] = useState<string | null>(null);
  const [priorityError, setPriorityError] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();

  useEffect(() => {
    if(!pending && formRef.current){
        formRef.current.reset()
    }
  }, [pending])

  const handleForm = async (formData: FormData) => {
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
      await addTask(body, priority);
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
    "border w-full mb-2 border-solid border-gray-400 bg-transparent p-3 rounded-xl";

  return (
    <Layout>
      <form action={handleForm} ref={formRef} className="space-y-2">
        <div className="flex justify-start mb-20">
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
          <input type="number" name="priority" className={inputClassName} />
          {priorityError && <p style={{ color: "red" }}>{priorityError}</p>}
        </div>

        <div className="flex">
          <button
            type="submit"
            className="bg-yellow-100 rounded-full py-3 w-40 text-black mx-auto"
          >
            Submit
          </button>
        </div>
      </form>
    </Layout>
  );
}

export default Create;
