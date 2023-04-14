import axios from "axios";
import { tokenStorage } from "~/services/localStorage";

// const authCtx = useContext(AuthContext);
// const token = authCtx.token;

const token = tokenStorage.get();

export default axios.create({
	baseURL: "https://api-expenses-and-incomes.onrender.com/api",
	headers: {
		"Content-type": "application/json",
		token,
	},
	withCredentials: true,
});
