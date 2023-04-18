import axios from "axios";
import { tokenStorage } from "~/services/localStorage";

const token = tokenStorage.get();

export default axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	headers: {
		"Content-type": "application/json",
		token,
	},
	withCredentials: true,
});
