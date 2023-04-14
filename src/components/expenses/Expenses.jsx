import { useContext, useEffect, useState } from "react";
import { MdDeleteForever, MdModeEditOutline } from "react-icons/md";
import { Header } from "~/components/Header";
import { Spinner } from "~/components/ui/Spinner";
import { useExpenses } from "~/hooks/useExpense";
import { formatDate } from "~/utils/formatDate";
import { Actions } from "./Actions";
import AuthContext from "../auth/AuthContext";

export const Expenses = () => {
	const authCtx = useContext(AuthContext);
	const userId = authCtx.id;

	const [sumExpenses, setSumExpenses] = useState(0);

	const [open, setOpen] = useState({
		action: false,
		popUp: false,
		modalDialog: false,
		title: "",
		id: "",
	});

	const { data, isLoading, refetch } = useExpenses(userId);

	useEffect(() => {
		setSumExpenses(
			data
				?.map((d) => d.price)
				.reduce((partialSum, a) => partialSum + a, 0)
		);
	}, [data]);

	if (isLoading) return <Spinner />;

	return (
		<>
			<Header />
			<div className="flex justify-center p-6">
				<span className="text-3xl text-white underline decoration-red-lite decoration-wavy">
					הוצאות
				</span>
			</div>

			{data?.length > 0 && (
				<div className="flex justify-center">
					<span className="text-xl text-white">
						סך הכל:
						<span className="text-red"> ₪{sumExpenses}</span>
					</span>
				</div>
			)}

			<div className="flex justify-start mr-10">
				<button
					className="h-10 text-white rounded-lg bg-green w-52 xl:w-52 sm:w-5/6 sm:mt-5"
					onClick={() =>
						setOpen({
							...open,
							popUp: true,
							action: true,
							title: "add",
						})
					}
				>
					הוספת הוצאה חדשה 👀
				</button>
			</div>
			{data?.length > 0 ? (
				<div className="grid justify-between grid-cols-4 gap-2 p-8 mt-10 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1">
					{data.map((expense) => (
						<div
							className="w-4/5 max-w-sm p-6 m-3 text-center duration-300 border shadow-lg animate-[wiggle_2s_ease-in-out_infinite] hover:animate-[wiggle_0s_ease-in-out_infinite] hover:-translate-y-1 hover:scale-100 shadow-red-lite/60 bg-gray-light border-gray rounded-t-3xl hover:shadow-black xl:w-full lg:w-11/12"
							key={expense._id}
						>
							<span className="text-2xl font-semibold text-gray-800">
								{expense.name}
							</span>

							<div className="flex items-center w-2/3 mt-4 text-gray-700">
								<span className="px-2 text-xl">
									סכום: ₪{expense.price.toFixed(2)}
								</span>
							</div>
							<div className="flex items-center w-2/3 mt-4 text-gray-700 xl:w-4/5">
								<span className="px-2 text-xl">
									תאריך: {formatDate(expense.date)}
								</span>
							</div>
							<div className="flex justify-start w-full p-2 mt-5">
								<MdDeleteForever
									className="!w-4/5 !h-7 !text-red !cursor-pointer"
									onClick={() =>
										setOpen({
											...open,
											modalDialog: true,
											action: true,
											title: "delete",
											id: expense._id,
										})
									}
								/>

								<MdModeEditOutline
									className="!w-4/5 !h-7 mr-24 !cursor-pointer text-blue xl:w-4/5 sm:w-11/12"
									onClick={() =>
										setOpen({
											...open,
											popUp: true,
											action: true,
											title: "update",
											id: expense._id,
										})
									}
								/>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="flex justify-center mt-8">
					<span className="text-2xl text-red-lite sm:text-lg">
						לא נמצאו הוצאות קיימות, זה הזמן להתחיל לבזבז.
					</span>
				</div>
			)}
			{open.action && (
				<Actions
					open={open}
					setOpen={setOpen}
					refetch={refetch}
					data={data}
					userId={userId}
					expenseId={open?.id}
				/>
			)}
		</>
	);
};
