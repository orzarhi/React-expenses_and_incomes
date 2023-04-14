import React, { useCallback, useEffect, useState } from "react";
import { expirationTimeStorage, tokenStorage } from "~/services/localStorage";
import { decodeToken } from "react-jwt";

let logoutTimer;

const AuthContext = React.createContext({
	token: "",
	id: "",
	name: "",
	isLoggedIn: false,
	login: (token) => {},
	logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
	const currentTime = new Date();
	const adjExpirationTime = new Date(expirationTime);
	const remainingDuration = adjExpirationTime - currentTime;

	return remainingDuration;
};

const retrieveStoredToken = () => {
	const storedToken = tokenStorage.get();
	const storedExpirationDate = expirationTimeStorage.get();

	const reamainingTime = calculateRemainingTime(storedExpirationDate);

	if (reamainingTime <= 60000) {
		expirationTimeStorage.remove();
		tokenStorage.remove();
		return null;
	}
	return {
		token: storedToken,
		duration: reamainingTime,
	};
};

export const AuthContextProvider = (props) => {
	const tokenData = retrieveStoredToken();
	let initialToken;

	if (tokenData) {
		initialToken = tokenData.token;
	}
	const [token, setToken] = useState(initialToken);
	const userIsLoggedIn = !!token;

	const logoutHandler = useCallback(() => {
		setToken(null);

		tokenStorage.remove();
		if (logoutTimer) {
			clearTimeout(logoutTimer);
		}
	}, []);

	const loginHandler = (token, expirationTime) => {
		setToken(token);
		tokenStorage.set(token);
		expirationTimeStorage.set(expirationTime);

		const remainingTime = calculateRemainingTime(expirationTime);

		logoutTimer = setTimeout(logoutHandler, remainingTime);
	};

	useEffect(() => {
		if (tokenData) {
			logoutTimer = setTimeout(logoutHandler, tokenData.duration);
		}
	}, [tokenData, logoutHandler]);

	const contextValue = {
		token: token,
		id: decodeToken(token)?.id,
		fullName: decodeToken(token)?.fullName,
		isLoggedIn: userIsLoggedIn,
		login: loginHandler,
		logout: logoutHandler,
	};
	return (
		<AuthContext.Provider value={contextValue}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
