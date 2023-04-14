export const ModalDialog = ({ title, setOpen, open, onClick }) => {
	return (
		<div
			className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full text-black bg-black/40"
			onClick={() => {
				setOpen({ ...open, modalDialog: false, action: false });
			}}
		>
			<div className="relative flex flex-col w-2/6 h-40 max-w-xl bg-white rounded-xl sm:w-3/4">
				<div
					className="absolute z-50 text-2xl font-bold text-black cursor-pointer right-2"
					onClick={() => setOpen({ ...open, modalDialog: false })}
				>
					&times;
				</div>
				<div className="flex justify-center p-8 text-black">
					<span className="text-2xl text-black">{title}</span>
				</div>
				<div className="flex items-center justify-center p-2">
					<button
						className="w-6/12 font-bold"
						onClick={() => setOpen({ ...open, modalDialog: false })}
					>
						סגור
					</button>
					<button
						className="w-6/12 font-bold text-red"
						onClick={() => {
							onClick();
							setOpen({ ...open, modalDialog: false });
						}}
					>
						כן
					</button>
				</div>
			</div>
		</div>
	);
};
