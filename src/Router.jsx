import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import { NotFound, Home, Statistics, Incomes, Expenses, AccountActivation, Form, AuthContext } from "./components";

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

			<Route path="/auth" element={<Form />} exact />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};
