export const currentDate = () => {
	const curr = new Date();
	curr.setDate(curr.getDate());
	const date = curr.toISOString().substring(0, 10);

	return date;
};
