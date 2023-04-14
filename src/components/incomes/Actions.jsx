import { PopUp } from "~/components/ui/PopUp";
import { useDeleteIncome } from "~/hooks/useIncome";
import { ModalDialog } from "../ui/ModalDialog";
import { Form } from "./Form";

export const Actions = (props) => {
	const { setOpen, open, refetch, data, userId, incomeId } = props;

	const { mutate: deleteMutateIncome } = useDeleteIncome(
		setOpen,
		open,
		refetch
	);

	const deleteIncomeHeader = () => {
		const deletedRequest = {
			userId,
			incomeId,
		};
		deleteMutateIncome(deletedRequest);
	};

	return (
		<>
			{open.modalDialog && (
				<ModalDialog
					onClick={deleteIncomeHeader}
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
						incomeId={incomeId}
						userId={userId}
						title={open?.title}
					/>
				</PopUp>
			)}
		</>
	);
};
