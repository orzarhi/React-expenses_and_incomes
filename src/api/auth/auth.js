import axios from "../axios";

export const register = async (user) => {
	const { data } = await axios.post("/user/register", user);

	return data;
};

export const getActivationMail = async (emailToken) => {
	const bodyContent = JSON.stringify({
		emailToken: emailToken,
	});
	const { data } = await axios.post(`/user/verify-email`, bodyContent);

	return data;
};

export const login = async (user) => {
	const { data } = await axios.post("/user/login", user);

	return data;
};
