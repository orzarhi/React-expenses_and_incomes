import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from ".";

export const Header = ({ }) => {
	const authCtx = useContext(AuthContext);

	const location = useLocation();

	const [click, setClick] = useState({
		expenses: false,
		incomes: false,
		statistics: false,
	})


	useEffect(() => {
		const path = location.pathname;

		if (path === "/expenses") {
			setClick({ ...click, expenses: true });
		}
		else if (path === "/incomes") {
			setClick({ ...click, incomes: true });
		}
		else if (path === "/statistics") {
			setClick({ ...click, statistics: true });
		}
	}, [])

	return (
		<header>
			<nav className="pt-3 pr-5 text-lg sm:text-base sm:pr-0">
				<ul className="flex justify-start max-w-screen-xl p-5 ml-5 text-white gap-x-12 lg:gap-x-8 md:gap-x-6 sm:gap-x-4 sm:p-2 sm:mr-2">
					<li>
						<Link to="/">בית</Link>
					</li>
					<li>
						<Link to="/expenses" className={`${click.expenses && "underline decoration-red-lite decoration-wavy"}`} >הוצאות</Link>
					</li>
					<li>
						<Link to="/incomes" className={`${click.incomes && "underline decoration-red-lite decoration-wavy"}`}>הכנסות</Link>
					</li>
					<li>
						<Link to="/statistics" className={`${click.statistics && "underline decoration-red-lite decoration-wavy"}`}>מה הלאה?</Link>
					</li>
					<li className="absolute left-0 ml-10 sm:ml-4">
						<button onClick={() => authCtx.logout()}>יציאה</button>
					</li>
				</ul>
			</nav>
		</header>
	);
};
