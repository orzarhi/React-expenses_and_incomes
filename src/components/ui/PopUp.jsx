import React from "react";

export const PopUp = ({ children, setOpen }) => {
	return (
		<div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black/40">
			<div className="relative flex flex-col w-3/4 max-w-xl bg-white rounded-2xl sm:overflow-y-scroll sm:w-3/4 sm:h-5/12 ">
				<div
					className="absolute z-50 text-3xl font-bold text-black cursor-pointer right-2"
					onClick={() => {
						setOpen({ ...open, popUp: false, action: false });
					}}
				>
					&times;
				</div>
				{children}
			</div>
		</div>
	);
};
