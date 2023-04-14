import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import { queryClient } from "./react-query/queryClient";
import AuthContext from "./components/auth/AuthContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Router } from "./Router";

export const App = () => {
	const authCtx = useContext(AuthContext);
	const token = authCtx.token;

	const navigate = useNavigate();

	useEffect(() => {
		if (token) return;
		navigate("/auth");
	}, [token]);

	return (
		<QueryClientProvider client={queryClient}>
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			<Router />
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
};
