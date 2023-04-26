import { useRef, useState } from "react";
import { useAddExpense, useUpdateExpense } from "~/hooks/useExpense";
import { currentDate } from "~/utils/currentDate";
import { formatDate } from "~/utils/formatDate";
import * as toastMessage from "~/utils/notification";
import { LoadingButton } from "../ui/Spinner";

export const Form = (props) => {
	const { setOpen, open, refetch, data, title, expenseId, userId } = props;

	const [changeForm, setChangeForm] = useState(false);

	const currentExpense = data?.find((expense) => expense?._id === expenseId);

	const defaultValue = formatDate(currentExpense?.date, "-", true);

	const nameInputRef = useRef();
	const priceInputRef = useRef();
	const dateInputRef = useRef();

	const clearInputs = () => {
		nameInputRef.current.value = "";
		priceInputRef.current.value = "";
		dateInputRef.current.value = "";
	};

	const { mutate: addMutateExpense } = useAddExpense(
		setOpen,
		open,
		refetch,
		clearInputs
	);

	const { mutate: updateMutateExpense } = useUpdateExpense(
		setOpen,
		open,
		refetch,
		clearInputs
	);

	const submitHandler = async (e) => {
		e.preventDefault();

		const name = nameInputRef?.current?.value;
		const price = priceInputRef?.current?.value;
		const date = dateInputRef?.current?.value;

		try {
			if (title === "add") {
				if (!name || !price || !date) {
					toastMessage.info("נא למלא את כל השדות.");
					return;
				}
				const addExpense = {
					userId,
					name,
					price,
					date,
				};
				setChangeForm(true);
				addMutateExpense(addExpense);
			} else if (title === "update") {
				const updateExpense = {
					expenseId: currentExpense?._id,
					name,
					price,
					date,
				};
				setChangeForm(true);
				updateMutateExpense(updateExpense);
			}
		} catch (err) {
			const error = err?.response?.data?.message;
			if (error) toastMessage.error(error);
			else toastMessage.error("משהו השתבש, נא לנסות שוב.");
		}
	};
	return (
		<form
			className="flex flex-wrap justify-center p-6 m-4 gap-y-7"
			onSubmit={submitHandler}
		>
			{title === "add" ? (
				<span className="text-2xl sm:text-base">
					חבל, יכלת לחסוך את זה 😜.
				</span>
			) : (
				<span className="text-2xl">עריכת הוצאה</span>
			)}
			<input
				className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-red-lite focus:ring-red-lite focus:outline-none focus:ring focus:ring-opacity-40"
				defaultValue={title === "update" ? currentExpense?.name : null}
				placeholder="תיאור"
				ref={nameInputRef}
			/>
			<input
				className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-red-lite focus:ring-red-lite focus:outline-none focus:ring focus:ring-opacity-40"
				type="number"
				defaultValue={title === "update" ? currentExpense?.price : null}
				placeholder="סכום"
				step="any"
				ref={priceInputRef}
			/>
			<input
				className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-red-lite focus:ring-red-lite focus:outline-none focus:ring focus:ring-opacity-40"
				type="date"
				defaultValue={title === "update" ? defaultValue : currentDate()}
				ref={dateInputRef}
				max={currentDate()}
			/>
			{!changeForm ? (
				<button className="w-full h-10 text-lg text-white rounded-md bg-red-lite">
					{title === "add" ? "הוספה" : "עדכון"}
				</button>
			) : (
				<button
					className={`w-full h-10 text-lg text-white rounded-md bg-red-lite ${changeForm ? "bg-red-lite/60" : "bg-red-lite"
						} `}
					disabled={changeForm}
				>
					<LoadingButton />
				</button>
			)}
		</form>
	);
};
