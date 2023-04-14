import axios from "axios";
import { tokenStorage } from "~/services/localStorage";

// const authCtx = useContext(AuthContext);
// const token = authCtx.token;

const token = tokenStorage.get();

export default axios.create({
	baseURL: "http://localhost:5000/api",
	headers: {
		"Content-type": "application/json",
		token,
	},
	withCredentials: true,
});
