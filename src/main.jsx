import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { AuthContextProvider } from "./components/auth/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
	<AuthContextProvider>
		<React.StrictMode>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</React.StrictMode>
	</AuthContextProvider>
);
