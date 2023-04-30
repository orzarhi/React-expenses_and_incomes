export const getDates = (yearAndMonth = false, fromDate = false) => {
	const dateNow = new Date();
	const year = dateNow.getFullYear();
	const monthWithOffset = dateNow.getUTCMonth() + 1;
	const month =
		monthWithOffset.toString().length < 2
			? `0${monthWithOffset}`
			: monthWithOffset;

	if (yearAndMonth) {
		return `${year}-${month}`;
	}
	const lastDayOfMonth = new Date(year, month, 0).getDate();

	return `${year}-${month}-${fromDate ? "01" : lastDayOfMonth}`;
};
