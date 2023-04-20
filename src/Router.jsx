import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { Expenses } from "./components/expenses";
import { Home } from "./components/Home";
import { Incomes } from "./components/incomes";
import { Statistics } from "./components/Statistics";
import { AuthForm } from "./components/auth/AuthForm";
import { AccountActivation } from "./components/auth/AccountActivation";
import AuthContext from "./components/auth/AuthContext";

export const Router = () => {
	const authCtx = useContext(AuthContext);
	const isLoggedIn = authCtx.isLoggedIn;

	return (
		<Routes>
			{isLoggedIn && (
				<>
					<Route path="/" element={<Home />} exact />
					<Route path="/expenses" element={<Expenses />} exact />
					<Route path="/incomes" element={<Incomes />} exact />
					<Route path="/statistics" element={<Statistics />} exact />
				</>
			)}
			<Route
				path="/user/verify-email/:emailToken"
				element={<AccountActivation />}
				exact
			/>
			<Route path="/auth" element={<AuthForm />} exact />
			<Route path="*" element={<div> Not Found 404.</div>} />
		</Routes>
	);
};
