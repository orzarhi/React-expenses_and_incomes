import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../";
import { useIncomes } from "~/hooks/useIncome";
import { Spinner } from "../ui/Spinner";
import { formatDate } from "~/utils/formatDate";
import { Header } from "../Header";
import { MdDeleteForever, MdModeEditOutline } from "react-icons/md";
import { Actions } from "./Actions";
import { FaSearchDollar } from "react-icons/fa";

export const Incomes = () => {
	const authCtx = useContext(AuthContext);
	const userId = authCtx.id;

	const [sumIncomes, setSumIncomes] = useState(0);
	const [searchInput, setSearchInput] = useState("");
	const [month, setMonth] = useState("");

	const [open, setOpen] = useState({
		action: false,
		popUp: false,
		modalDialog: false,
		title: "",
		id: "",
	});

	const { data, isLoading, refetch } = useIncomes(userId);

	const dataResults = data?.filter((d) =>
		d?.name.toLowerCase().includes(searchInput.toLowerCase()) && d?.date.slice(0, 7).includes(month.slice(0, 7))
	);

	useEffect(() => {
		setSumIncomes(
			dataResults
				?.map((d) => d.price)
				.reduce((partialSum, a) => partialSum + a, 0)
		);
	}, [dataResults]);

	if (isLoading) return <Spinner />;

	return (
		<>
			<Header />
			<div className="flex justify-center p-6">
				<span className="text-3xl text-white underline decoration-red-lite decoration-wavy">
					הכנסות
				</span>
			</div>
			{dataResults?.length > 0 && (
				<div className="flex justify-center">
					<span className="text-xl text-white">
						סך הכל:{" "}
						<span className="text-green"> ₪{sumIncomes}</span>
					</span>
				</div>
			)}
			{data?.length > 0 && <div className="flex justify-center mt-5 ">
				<input
					className="w-64 text-white bg-transparent bg-black border rounded-md placeholder:text-center"
					placeholder="חיפוש הכנסה..."
					autoComplete="off"
					onChange={({ target }) => setSearchInput(target.value)}
				/>
				<FaSearchDollar className="relative text-base text-white left-5 top-1" />

			</div>}
			<div className="flex justify-start mr-10 md:mt-5 sm:justify-center sm:mr-0">
				<button
					type="submit"
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
					הוספת הכנסה חדשה 🎉
				</button>
			</div>
			<div className="flex justify-start mt-5 mr-10 md:mt-5 sm:justify-center sm:mr-0">
				<input type="month" placeholder="לפי חודש" className="rounded-lg shadow-md w-52 bg-gray-light/80 shadow-white/40" onChange={({ target }) => setMonth(target.value)} />
			</div>
			{dataResults?.length > 0 ? (
				<div className="grid justify-between grid-cols-4 gap-2 p-8 mt-10 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-2 sm:gap-5 sm:p-3">
					{dataResults.map((income) => (
						<div
							className="w-4/5 max-w-sm p-6 m-3 text-center duration-300 border shadow-lg animate-[wiggle_2s_ease-in-out_infinite] hover:animate-[wiggle_0s_ease-in-out_infinite] hover:-translate-y-1 hover:scale-100 shadow-green bg-gray-light border-gray rounded-t-3xl hover:shadow-black xl:w-full lg:w-11/12 sm:w-full sm:m-0 sm:mb-4"
							key={income._id}
						>
							<span className="text-2xl break-words font-semibold text-gray-800 sm:text-xl">
								{income.name}
							</span>

							<div className="flex items-center w-2/3 mt-4 sm:w-full">
								<span className="px-2 text-xl sm:text-lg sm:px-8">
									סכום: ₪{income.price.toFixed(2)}
								</span>
							</div>
							<div className="flex items-center w-2/3 mt-4 xl:w-4/5 md:w-full">
								<span className="px-2 text-xl sm:text-lg">
									תאריך: {formatDate(income.date)}
								</span>
							</div>
							<div className="flex justify-start w-full p-2 mt-5 sm:w-full sm:gap-x-10">
								<MdDeleteForever
									className="!w-4/5 !h-7 !text-red !cursor-pointer sm:!w-full"
									onClick={() =>
										setOpen({
											...open,
											modalDialog: true,
											action: true,
											title: "delete",
											id: income._id,
										})
									}
								/>

								<MdModeEditOutline
									className="!w-4/5 !h-7 mr-24 !cursor-pointer text-blue xl:!w-4/5 sm:!mr-0 sm:!w-full"
									onClick={() =>
										setOpen({
											...open,
											popUp: true,
											action: true,
											title: "update",
											id: income._id,
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
						לא נמצאו הכנסות קיימות
						{data.length === 0 && (
							<span>, זה הזמן להתחיל לעבוד.</span>
						)}
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
					incomeId={open?.id}
				/>
			)}
		</>
	);
};
