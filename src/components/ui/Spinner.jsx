import React from "react";
import { MoonLoader } from "react-spinners";

export const Spinner = () => {
	return (
		<div className="flex items-center justify-center mt-32">
			<MoonLoader color="#FDF4F5" />
		</div>
	);
};
