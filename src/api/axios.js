import axios from "axios";
import { tokenStorage } from "~/services/localStorage";

const token = tokenStorage.get();

const baseURL = import.meta.env.DEV
	? `${import.meta.env.VITE_DEV}`
	: `${import.meta.env.VITE_PROD}`;

export default axios.create({
	baseURL: "https://api-expenses-and-incomes.onrender.com/api",
	headers: {
		"Content-type": "application/json",
		token,
	},
	withCredentials: true,
});
