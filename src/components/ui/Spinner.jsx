import React from "react";
import { ClipLoader, MoonLoader } from "react-spinners";

export const Spinner = () => {
	return (
		<div className="flex items-center justify-center mt-32">
			<MoonLoader color="#FDF4F5" />
		</div>
	);
};

export const LoadingButton = () => {
	return <ClipLoader color="#191919" size={15} />;
};
