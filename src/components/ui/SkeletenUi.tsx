import Layout from "../Layout"
function SkeletenUi() {
  return (
	<Layout>
	<div className="min-h-screen px-4 py-6 text-gray-200 dark:text-white">
      {/* Tabs */}
      <div className="flex space-x-3 mb-6">
        {["Todo", "In Progress", "Done"].map((_tab, idx) => (
          <div
            key={idx}
            className={`h-8 w-24 rounded-full ${
              idx === 0 ? "bg-gray-100 dark:bg-[#B9F8CF]" : "bg-gray-100 dark:bg-[#1f1f1f]"
            } animate-pulse`}
          ></div>
        ))}
        <div className="ml-auto h-8 w-8 rounded-full bg-gray-100 dark:bg-[#FFF085] animate-pulse"></div>
      </div>

      {/* Skeleton Cards */}
      {[...Array(4)].map((_, idx) => (
        <div
          key={idx}
          className="bg-gray-200 dark:bg-[#1a1a1a] rounded-xl p-4 mb-4 animate-pulse flex items-start justify-between"
        >
          <div className="space-y-2">
            <div className="h-4 w-24 dark:bg-gray-600 rounded"></div>
            <div className="h-5 w-32 bg-gray-100 dark:bg-gray-400 rounded"></div>
          </div>

          <div className="flex flex-col items-end justify-between space-y-4">
            <div className="h-5 w-5 rounded bg-gray-100  dark:bg-gray-500"></div>
            <div className="flex items-center space-x-1">
              <div className="h-4 w-4 bg-gray-100  dark:bg-gray-500 rounded"></div>
              <div className="h-4 w-4 bg-gray-100 dark:bg-gray-500 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
	</Layout>
  )
}

export default SkeletenUi

