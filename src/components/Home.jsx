import React from "react";
import financialProfit from "../assets/images/financialProfit.png";
import { useNavigate } from "react-router-dom";
export const Home = () => {
	const navigate = useNavigate();

	return (
		<>
			<div className="flex justify-center p-5 mt-40">
				<span className="text-4xl text-white underline mb-25 decoration-red-lite decoration-wavy">
					ברוכים הבאים
				</span>
			</div>
			<div className="flex justify-center p-10">
				<img src={financialProfit} className="w-36" />
			</div>
			<div className="flex justify-center p-5">
				<span className="text-2xl text-white sm:text-lg">
					מעקב מלא אחר ההוצאות וההכנסות שלך.
				</span>
			</div>
			<div className="flex justify-center p-5">
				<button
					className="h-10 text-lg text-white rounded-b-lg bg-red-lite w-36 animate-bounce"
					onClick={() => navigate("/expenses")}
				>
					בואו נתחיל
				</button>
			</div>
		</>
	);
};
