import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getSummary,
} from "../../api/transactionApi";

// GET ALL TRANSACTIONS
export const useTransactions =
  () => {
    return useQuery({
      queryKey: [
        "transactions",
      ],

      queryFn:
        getTransactions,
    });
  };

// CREATE TRANSACTION
export const useCreateTransaction =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        createTransaction,

      onSuccess:
        () => {
          queryClient.invalidateQueries({
            queryKey: [
              "transactions",
            ],
          });
        },
    });
  };

// UPDATE TRANSACTION
export const useUpdateTransaction =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        updateTransaction,

      onSuccess:
        () => {
          queryClient.invalidateQueries({
            queryKey: [
              "transactions",
            ],
          });
        },
    });
  };

// DELETE TRANSACTION
export const useDeleteTransaction =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        deleteTransaction,

      onSuccess:
        () => {
          queryClient.invalidateQueries({
            queryKey: [
              "transactions",
            ],
          });
        },
    });
  };

// MONTHLY SUMMARY
export const useSummary =
  () => {
    return useQuery({
      queryKey: [
        "summary",
      ],

      queryFn:
        getSummary,
    });
  };