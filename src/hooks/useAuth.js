import { useContext } from "react";
import { useMutation } from "react-query";
import * as authApi from "~/api/auth";
import { AuthContext } from "~/components";
import { error } from "~/utils/onError";
import { success } from "~/utils/onSuccess";

export const useRegister = (
	setOpen,
	open,
	clearInputs,
	setRegisterForm,
	setRegistered
) =>
	useMutation(authApi.register, {
		onSuccess: (data) => {
			success(data);
			setOpen({ ...open, popUp: true });
			clearInputs();
			setRegisterForm(true);
			setRegistered(false);
		},
		onError: (data) => {
			error(data);
			setRegistered(false);
		},
	});

export const useActivationMail = () =>
	useMutation(authApi.getActivationMail, {
		onSuccess: (data) => {
			success(data);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useLogin = (setConnecting) => {
	const authCtx = useContext(AuthContext);

	const expirationTime = new Date(new Date().getTime() + 60 * 60 * 24000); // 24 hours

	return useMutation(authApi.login, {
		onSuccess: (data) => {
			authCtx.login(data, expirationTime);
			window.location.href = "/";
		},
		onError: (data) => {
			setConnecting(false);
			error(data);
		},
	});
};

export const useForgotPassword = (
	setVerificationCode,
	clearInputs,
	setCurrentRealCode
) =>
	useMutation(authApi.forgotPassword, {
		onSuccess: (data) => {
			setCurrentRealCode(data.code);
			success(data, clearInputs);
			setVerificationCode(true);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useVerificationCode = (setSuccessfullyVerified) =>
	useMutation(authApi.verificationCode, {
		onSuccess: (data) => {
			success(data);
			setSuccessfullyVerified(true);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useChangePassword = (setOpen, open, clearInputs) =>
	useMutation(authApi.changePassword, {
		onSuccess: (data) => {
			success(data, setOpen, open, clearInputs);
		},
		onError: (data) => {
			error(data);
		},
	});
