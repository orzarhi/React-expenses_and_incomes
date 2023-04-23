export const chartIncomes = (incomes) => {
	const chartPoints = [
		{ label: "ינואר", value: 0 },
		{ label: "פרואר", value: 0 },
		{ label: "מרץ", value: 0 },
		{ label: "אפריל", value: 0 },
		{ label: "מאי", value: 0 },
		{ label: "אוגוסט", value: 0 },
		{ label: "יוני", value: 0 },
		{ label: "יולי", value: 0 },
		{ label: "ספטמבר", value: 0 },
		{ label: "אוקטובר", value: 0 },
		{ label: "נובמבר", value: 0 },
		{ label: "דצמבר", value: 0 },
	];

	for (const income of incomes) {
		const incomeMonth = new Date(income.date).getMonth();
		chartPoints[incomeMonth].value += income.price;
	}

	return chartPoints;
};

export const chartExpenses = (expenses) => {
	const chartPoints = [
		{ label: "ינואר", value: 0 },
		{ label: "פרואר", value: 0 },
		{ label: "מרץ", value: 0 },
		{ label: "אפריל", value: 0 },
		{ label: "מאי", value: 0 },
		{ label: "אוגוסט", value: 0 },
		{ label: "יוני", value: 0 },
		{ label: "יולי", value: 0 },
		{ label: "ספטמבר", value: 0 },
		{ label: "אוקטובר", value: 0 },
		{ label: "נובמבר", value: 0 },
		{ label: "דצמבר", value: 0 },
	];

	for (const expense of expenses) {
		const expenseMonth = new Date(expense.date).getMonth();
		chartPoints[expenseMonth].value += expense.price;
	}

	return chartPoints;
};
