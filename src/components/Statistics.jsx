import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./auth/AuthContext";
import { useExpenses } from "~/hooks/useExpense";
import { useIncomes } from "~/hooks/useIncome";
import { Spinner } from "./ui/Spinner";
import { Header } from "./Header";
import { ChartBar } from "./chartBar";
import { highestAmount } from "../logic/highestAmount";

export const Statistics = () => {
	const authCtx = useContext(AuthContext);
	const userId = authCtx.id;

	const [sumExpenses, setSumExpenses] = useState(0);
	const [sumIncomes, setSumIncomes] = useState(0);

	const { data: expenses, isLoading: expensesLoading } = useExpenses(userId);
	const { data: incomes, isLoading: incomesLoading } = useIncomes(userId);

	const totalExpenses = sumExpenses - sumIncomes;

	useEffect(() => {
		setSumExpenses(
			expenses
				?.map((d) => d.price)
				.reduce((partialSum, a) => partialSum + a, 0)
		);
		setSumIncomes(
			incomes
				?.map((d) => d.price)
				.reduce((partialSum, a) => partialSum + a, 0)
		);
	}, [expenses, incomes]);

	if (expensesLoading || incomesLoading) return <Spinner />;

	return (
		<>
			<Header />
			{expenses.length <= 0 ? (
				<div className="flex justify-center mt-20 ">
					<span className="text-2xl text-white ">
						אין כרגע נתונים על מנת לבצע חישובים וסטטיסטיקות, הגיע
						הזמן להתחיל לבזבז או לעבוד 🤷‍♂️.
					</span>
				</div>
			) : (
				<>
					<div className="flex justify-center mt-20 sm:mr-4">
						<span className="text-2xl text-white ">
							אז אם הגעת לכאן את/ה בטח רוצה לדעת איך נמשיך את המשך
							החודש.
						</span>
					</div>
					{totalExpenses > 0 ? (
						<>
							<div className="flex justify-center p-6 sm:mr-0">
								<span className="text-2xl text-white">
									נכון לעכשיו המצב פחות טוב, את/ה חורג ב:
									<span className="text-red">
										{" "}
										₪{totalExpenses.toFixed(2)}
									</span>
									, על סמך ההוצאות/הכנסות שלך.
								</span>
							</div>
						</>
					) : (
						<div className="flex justify-center p-6 sm:mr-0">
							<span className="text-2xl text-white">
								כרגע המצב מצוין, את/ה ביתרה על סך:
								<span className="text-green">
									{" "}
									₪{(totalExpenses * -1).toFixed(2)}
								</span>
								, על סמך ההוצאות/הכנסות שלך.
							</span>
						</div>
					)}
					<div className="grid m-24 sm:mr-4">
						{expenses?.length > 0 && (
							<span className="mb-3 text-xl text-white">
								ההוצאה הגבוהה ביותר:{" "}
								<span className="text-red">
									₪{highestAmount(expenses)}
								</span>
							</span>
						)}
						{incomes?.length > 0 && (
							<span className="text-xl text-white">
								ההכנסה הגבוהה ביותר:{" "}
								<span className="text-green">
									₪{highestAmount(incomes)}
								</span>
							</span>
						)}
					</div>

					<ChartBar expenses={expenses} incomes={incomes} />
				</>
			)}
		</>
	);
};
