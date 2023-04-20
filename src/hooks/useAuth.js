import { useContext } from "react";
import { useMutation } from "react-query";
import * as auth from "~/api/auth";
import AuthContext from "~/components/auth/AuthContext";
import { error } from "~/utils/onError";
import { success } from "~/utils/onSuccess";

export const useLogin = (setConnecting) => {
	const authCtx = useContext(AuthContext);

	const expirationTime = new Date(new Date().getTime() + 60 * 60 * 24000); // 24 hours

	return useMutation(auth.login, {
		onSuccess: async (data) => {
			authCtx.login(data, expirationTime);
			window.location.href = "/";
		},
		onError: (data) => {
			setConnecting(false);
			error(data);
		},
	});
};

export const useActivationMail = () =>
	useMutation(auth.getActivationMail, {
		onSuccess: async (data) => {
			success(data);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useRegister = (
	setOpen,
	open,
	clearInputs,
	setRegisterForm,
	setRegistered
) =>
	useMutation(auth.register, {
		onSuccess: async (data) => {
			success(data);
			setOpen({ ...open, popUp: true });
			clearInputs();
			setRegisterForm(true);
		},
		onError: (data) => {
			error(data);
			setRegistered(false);
		},
	});
