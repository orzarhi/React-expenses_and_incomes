import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { Expenses } from "./components/expenses";
import { Home } from "./components/Home";
import { Incomes } from "./components/incomes";
import { Statistics } from "./components/Statistics";
import * as auth from "./components/auth";

export const Router = () => {
	const authCtx = useContext(auth.AuthContext);
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
				element={<auth.AccountActivation />}
				exact
			/>
			{/* <Route
				path="/user/forgot-password/:forgotPasswordToken"
				element={<auth.ForgotPassword />}
				exact
			/> */}
			<Route path="/auth" element={<auth.Form />} exact />
			<Route path="*" element={<div> Not Found 404.</div>} />
		</Routes>
	);
};
