import { PopUp } from "~/components/ui/PopUp";
import { ModalDialog } from "../ui/ModalDialog";
import { Form } from "./Form";
import { useDeleteExpense } from "~/hooks/useExpense";

export const Actions = (props) => {
	const { setOpen, open, refetch, data, userId, expenseId } = props;

	const { mutate: deleteMutateExpense } = useDeleteExpense(
		setOpen,
		open,
		refetch
	);

	const deleteExpenseHeader = () => {
		const deletedRequest = {
			userId,
			expenseId,
		};
		deleteMutateExpense(deletedRequest);
	};

	return (
		<>
			{open.modalDialog && (
				<ModalDialog
					onClick={deleteExpenseHeader}
					title={"האם את/ה בטוח ?"}
					setOpen={setOpen}
					open={open}
				/>
			)}
			{open.popUp && (
				<PopUp setOpen={setOpen} open={open}>
					<Form
						data={data}
						refetch={refetch}
						setOpen={setOpen}
						open={open}
						expenseId={expenseId}
						userId={userId}
						title={open?.title}
					/>
				</PopUp>
			)}
		</>
	);
};
