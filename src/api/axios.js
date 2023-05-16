import axios from "axios";
import { tokenStorage } from "~/services/localStorage";

const token = tokenStorage.get();

const baseURL = import.meta.env.DEV
	? "http://localhost:5000/api"
	: "https://api-expenses-and-incomes.onrender.com/api";

export default axios.create({
	baseURL,
	headers: {
		"Content-type": "application/json",
		token,
	},
	withCredentials: true,
});
