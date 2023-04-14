import axios from "../axios";

export const getIncomes = async (userId) => {
	const { data } = await axios.get(`/income/${userId}`);

	return data;
};

export const addIncome = async (requset) => {
	const { userId } = requset;

	const { data } = await axios.post(`/income/add/${userId}`, requset);

	return data;
};

export const updateIncome = async (requset) => {
	const { incomeId } = requset;

	const { data } = await axios.patch(`income/update/${incomeId}`, requset);

	return data;
};

export const deleteIncome = async (requset) => {
	const { userId, incomeId } = requset;

	const { data } = await axios.delete(`income/${userId}/delete/${incomeId}`);

	return data;
};
