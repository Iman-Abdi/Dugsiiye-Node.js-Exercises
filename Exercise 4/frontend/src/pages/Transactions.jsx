import { useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";

import CreateTransaction from "../components/transactions/CreateTransaction";

import DeleteTransaction from "../components/transactions/DeleteTransaction";

import EditTransaction from "../components/transactions/EditTransaction";

import { Input } from "@/components/ui/input";

import {
  useTransactions,
} from "../features/transactions/transactionQueries";

export default function Transactions() {
  const {
    data,
    isLoading,
    error,
  } = useTransactions();

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("");

  if (isLoading) {
    return (
      <DashboardLayout>
        <h1>Loading...</h1>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <h1>
          Failed to load transactions
        </h1>
      </DashboardLayout>
    );
  }

  const filteredTransactions =
    data?.filter(
      (transaction) => {
        const searchMatch =
          transaction.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const categoryMatch =
          !category ||
          transaction.category ===
            category;

        return (
          searchMatch &&
          categoryMatch
        );
      }
    ) || [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            Transactions
          </h1>
        </div>

        {/* Create Form */}
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">
            Add Transaction
          </h2>

          <CreateTransaction />
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Search transaction..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            className="border rounded-md p-2"
          >
            <option value="">
              All Categories
            </option>

            <option value="Food">
              Food
            </option>

            <option value="Transport">
              Transport
            </option>

            <option value="Bills">
              Bills
            </option>

            <option value="Salary">
              Salary
            </option>

            <option value="Shopping">
              Shopping
            </option>
          </select>
        </div>

        {/* Transactions List */}
        {filteredTransactions.length ===
        0 ? (
          <div className="text-center py-10 border rounded-lg">
            <h2 className="text-xl font-semibold">
              No Transactions Found
            </h2>

            <p className="text-muted-foreground">
              Create your first
              transaction.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTransactions.map(
              (
                transaction
              ) => (
                <div
                  key={
                    transaction._id
                  }
                  className="border rounded-lg p-4 flex flex-col gap-4"
                >
                  <div>
                    <h3 className="font-bold text-lg">
                      {
                        transaction.title
                      }
                    </h3>

                    <p>
                      Amount:
                      {" "}
                      {
                        transaction.amount
                      }
                    </p>

                    <p>
                      Category:
                      {" "}
                      {
                        transaction.category
                      }
                    </p>

                    <p>
                      Type:
                      {" "}
                      {
                        transaction.type
                      }
                    </p>

                    <p>
                      Date:
                      {" "}
                      {new Date(
                        transaction.date
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <EditTransaction
                      transaction={
                        transaction
                      }
                    />

                    <DeleteTransaction
                      id={
                        transaction._id
                      }
                    />
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}