
function BackgroundCircles() {
	// #B9F8CF
	// #FFF085
  return (
	<div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Mint Green Circle */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-[#B9F8CF] rounded-full opacity-30 blur-3xl"></div>

      {/* Soft Yellow Circle */}
      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-[#FFF085] rounded-full opacity-20 blur-3xl"></div>

      {/* Subtle Mint Glow */}
      <div className="absolute top-1/2 left-[-150px] w-[200px] h-[200px] bg-[#B9F8CF] rounded-full opacity-10 blur-2xl"></div>

      {/* Subtle Yellow Glow */}
      <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[#FFF085] rounded-full opacity-10 blur-2xl"></div>
    </div>
  )
}

export default BackgroundCircles