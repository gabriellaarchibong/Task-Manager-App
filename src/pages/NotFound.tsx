import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
	const navigate = useNavigate();

	const handleBack = () => {
		navigate(-1);
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
			<div className="bg-white rounded-xl shadow-2xl p-10 flex flex-col items-center animate-fade-in-up">
				<h1 className="text-7xl font-extrabold text-red-500 mb-4 animate-bounce">404</h1>
				<p className="text-2xl font-semibold text-gray-800 mb-6 text-center">
					The page you are looking for was not found.
				</p>
				<button
					onClick={handleBack}
					className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 animate-pulse"
				>
					Go Back
				</button>
			</div>
			<style>
				{`
					@keyframes fade-in-up {
						0% {
							opacity: 0;
							transform: translateY(40px);
						}
						100% {
							opacity: 1;
							transform: translateY(0);
						}
					}
					.animate-fade-in-up {
						animation: fade-in-up 0.7s cubic-bezier(0.4, 0, 0.2, 1);
					}
				`}
			</style>
		</div>
	);
};

export default NotFound;