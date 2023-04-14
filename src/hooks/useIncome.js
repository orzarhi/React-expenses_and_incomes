import { useMutation, useQuery } from "react-query";
import * as incomes from "~/api/income";
import { queryKeys } from "~/react-query/queryKeys";
import { error } from "~/utils/onError";
import { success } from "~/utils/onSuccess";

export const useIncomes = (userId) =>
	useQuery([queryKeys.income], () => incomes.getIncomes(userId), {
		enabled: !!userId,
	});

export const useAddIncome = (setOpen, open, refetch, clearInputs) =>
	useMutation(incomes.addIncome, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch, clearInputs);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useUpdateIncome = (setOpen, open, refetch, clearInputs) =>
	useMutation(incomes.updateIncome, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch, clearInputs);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useDeleteIncome = (setOpen, open, refetch) =>
	useMutation((requset) => incomes.deleteIncome(requset), {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});
