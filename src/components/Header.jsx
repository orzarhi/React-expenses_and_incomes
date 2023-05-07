import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from ".";

export const Header = () => {
	const authCtx = useContext(AuthContext);

	return (
		<header>
			<nav className="pt-3 pr-5 text-lg sm:text-base sm:pr-0">
				<ul className="flex justify-start max-w-screen-xl p-5 ml-5 text-white gap-x-12 lg:gap-x-8 md:gap-x-6 sm:gap-x-4 sm:p-2">
					<li>
						<Link to="/">בית</Link>
					</li>
					<li>
						<Link to="/expenses">הוצאות</Link>
					</li>
					<li>
						<Link to="/incomes">הכנסות</Link>
					</li>
					<li>
						<Link to="/statistics">מה הלאה?</Link>
					</li>
					<li className="absolute left-0 ml-10 sm:ml-3">
						<button onClick={() => authCtx.logout()}>יציאה</button>
					</li>
				</ul>
			</nav>
		</header>
	);
};
