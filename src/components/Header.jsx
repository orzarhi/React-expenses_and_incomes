import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./auth/AuthContext";

export const Header = () => {
	const authCtx = useContext(AuthContext);

	return (
		<header>
			<nav className="pt-3 pr-5 text-lg sm:text-base sm:pr-0 sm:ml-5">
				<ul className="flex justify-start max-w-screen-xl p-5 ml-5 text-white">
					<li className="ml-8 sm:ml-5">
						<Link to="/">בית</Link>
					</li>
					<li className="ml-8 sm:ml-5">
						<Link to="/expenses">הוצאות</Link>
					</li>
					<li className="ml-8 sm:ml-5">
						<Link to="/incomes">הכנסות</Link>
					</li>
					<li className="ml-8 sm:ml-5">
						<Link to="/statistics">מה הלאה?</Link>
					</li>
					<li className="absolute left-0 ml-10 sm:ml-5">
						<button onClick={() => authCtx.logout()}>יציאה</button>
					</li>
				</ul>
			</nav>
		</header>
	);
};
