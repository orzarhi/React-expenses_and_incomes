import * as toastMessage from "./notification";

export const success = (
	data,
	setOpen = () => {},
	open = "",
	refetch = () => {},
	clearInputs = () => {}
) => {
	setOpen({
		...open,
		popUp: false,
		action: false,
		modalDialog: false,
		forgotPassword: false,
	});
	toastMessage.success(data.message);
	refetch();
	clearInputs();
};
