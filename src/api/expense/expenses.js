import axios from "../axios";

export const getExpenses = async (userId) => {
	const { data } = await axios.get(`/expense/${userId}`);

	return data;
};

export const addExpense = async (requset) => {
	const { userId } = requset;

	const { data } = await axios.post(`/expense/add/${userId}`, requset);

	return data;
};

export const updateExpense = async (requset) => {
	const { expenseId } = requset;

	const { data } = await axios.patch(`expense/update/${expenseId}`, requset);

	return data;
};

export const deleteExpense = async (requset) => {
	const { userId, expenseId } = requset;

	const { data } = await axios.delete(
		`expense/${userId}/delete/${expenseId}`
	);

	return data;
};
