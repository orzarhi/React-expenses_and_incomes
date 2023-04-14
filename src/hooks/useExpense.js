import { useMutation, useQuery } from "react-query";
import * as expenses from "~/api/expense";
import { queryKeys } from "~/react-query/queryKeys";
import { error } from "~/utils/onError";
import { success } from "~/utils/onSuccess";

export const useExpenses = (userId) =>
	useQuery([queryKeys.expense], () => expenses.getExpenses(userId), {
		enabled: !!userId,
	});

export const useAddExpense = (setOpen, open, refetch, clearInputs) =>
	useMutation(expenses.addExpense, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch, clearInputs);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useUpdateExpense = (setOpen, open, refetch, clearInputs) =>
	useMutation(expenses.updateExpense, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch, clearInputs);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useDeleteExpense = (setOpen, open, refetch) =>
	useMutation((requset) => expenses.deleteExpense(requset), {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});
