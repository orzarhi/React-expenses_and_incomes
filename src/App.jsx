import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import { queryClient } from "./react-query/queryClient";
import { AuthContext } from "./components";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Router } from "./Router";
import * as toastMessage from "./utils/notification";

export const App = () => {
	const authCtx = useContext(AuthContext);
	const token = authCtx.token;
	const isLoggedIn = authCtx.isLoggedIn;

	const navigate = useNavigate();

	useEffect(() => {
		if (token) return;
		navigate("/auth");
	}, [token]);


	useEffect(() => {
		if (!isLoggedIn && location.pathname !== "/auth") {
			navigate("/auth");
			toastMessage.info("נא להתחבר מחדש.");
		}
	}, []);

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
