import Layout from "../components/Layout"
import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";
import welcomeImage from "../assets/welcome-image.svg"

function Welcome() {
  return (
    <Layout>
    <div className="h-screen flex flex-col">
      <div className="max-w-96 mx-auto my-auto">
        <div className="mx-auto pt-10">
          <img src={welcomeImage} alt="welcome image" />
        </div>

        <div className="mt-10">
          <p className="text-4xl text-gray-500 darK:text-gray-200 font-semibold">
            <span className="text-green-500 dark:text-green-200 mr-2">Better </span>
            Task Management v2
          </p>
          <p className="mt-4 text-gray-400 dark:text-gray-300 text-opacity-90">
            A simple and efficient task manager app to help you organize, track, and complete your daily tasks with ease.
          </p>
        </div>

        <div className="mt-5">
          <Link
            to="/signup"
            className="w-fit flex gap-2 rounded-full bg-yellow-200 text-black"
          >
            <span className="my-auto inline-block pl-5 pr-3">
              Get Started
            </span>
            <div className="p-4 rounded-full m-1 text-white bg-black">
              <IoArrowForward className="my-auto text-2xl text-white" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default Welcome