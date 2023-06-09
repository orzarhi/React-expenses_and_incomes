import { useRef } from "react";
import ReactApexChart from "react-apexcharts";
import { chartExpenses, chartIncomes } from "~/logic/chartPoints";

export const ChartBar = ({ expenses, incomes }) => {

	const chartPointsExpenses = chartExpenses(expenses);
	const chartPointsIncomes = chartIncomes(incomes);

	const chart = useRef({
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
			options={chart?.current.options}
			series={chart?.current.series}
			type="bar"
			height={350}
		/>
	);
};
