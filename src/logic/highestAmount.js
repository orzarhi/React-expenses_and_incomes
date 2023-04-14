export const highestAmount = (data) => {
	const priceOfAllItem = data?.map((item) => item?.price);
	return Math?.max(...priceOfAllItem);
};
