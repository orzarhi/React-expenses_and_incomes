import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

export const ChartBar = ({ expenses, incomes }) => {
	const chartPointsExpenses = [
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
	const chartPointsIncomes = [
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
		chartPointsExpenses[expenseMonth].value += expense.price;
	}
	for (const income of incomes) {
		const incomeMonth = new Date(income.date).getMonth();
		chartPointsIncomes[incomeMonth].value += income.price;
	}

	const [state, setState] = useState({
		series: [
			{
				name: "הוצאות",
				data: chartPointsExpenses?.map((d) => d.value),
				color: "#D21312",
			},
			{
				name: "הכנסות",
				data: chartPointsIncomes?.map((d) => d.value),
				color: "#5F8D4E",
			},
		],

		options: {
			title: {
				text: "הוצאות חודשיות",
				align: "center",
				floating: true,
				style: {
					fontSize: "16px",
					fontWeight: "bold",
					fontFamily: `"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif`,
					color: "#fff",
				},
			},
			chart: {
				type: "bar",
				height: 350,
				redrawOnWindowResize: true,
			},
			plotOptions: {
				bar: {
					horizontal: false,
					columnWidth: "10%",
					endingShape: "rounded",
				},
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				show: true,
				width: 6,
				color: "#fff",
			},
			xaxis: {
				categories: chartPointsExpenses?.map((d) => d.label),
				labels: {
					style: {
						colors: "#fff",
						fontSize: "12px",
						fontFamily: "Helvetica, Arial, sans-serif",
						fontWeight: 400,
						cssClass: "apexcharts-xaxis-label",
					},
				},
			},
			yaxis: {
				labels: {
					style: {
						colors: "#fff",
						fontSize: "12px",
						fontFamily: "Helvetica, Arial, sans-serif",
						fontWeight: 400,
						cssClass: "apexcharts-xaxis-label",
					},
				},
			},
			fill: {
				opacity: 1,
			},
		},
	});

	return (
		<ReactApexChart
			options={state.options}
			series={state.series}
			type="bar"
			height={350}
		/>
	);
};
