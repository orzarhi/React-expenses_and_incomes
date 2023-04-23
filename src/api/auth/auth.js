import axios from "../axios";

export const register = async (user) => {
	const { data } = await axios.post("/user/register", user);

	return data;
};

export const getActivationMail = async (emailToken) => {
	const bodyContent = JSON.stringify({
		emailToken,
	});

	const { data } = await axios.post(`/user/verify-email`, bodyContent);

	return data;
};

export const login = async (user) => {
	const { data } = await axios.post("/user/login", user);

	return data;
};

export const forgotPassword = async (user) => {
	const { data } = await axios.post("/user/forgot-password", user);

	return data;
};

export const verificationCode = async (code) => {
	const { data } = await axios.post("/user/verification-code", code);

	return data;
};

export const changePassword = async (request) => {
	const { data } = await axios.post("/user/change-password", request);

	return data;
};
