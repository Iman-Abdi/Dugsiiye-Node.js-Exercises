import { useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";
import CreateTransaction from "../components/transactions/CreateTransaction";
import DeleteTransaction from "../components/transactions/DeleteTransaction";
import EditTransaction from "../components/transactions/EditTransaction";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  useTransactions,
} from "../features/transactions/transactionQueries";

const categories =
  ["Food", "Transport", "Bills", "Salary", "Shopping", "Health", "Other"];

const money =
  (value = 0) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

export default function Transactions() {
  const {
    data,
    isLoading,
    error,
  } = useTransactions();

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("all");

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-4">
          <div className="h-10 w-64 animate-pulse rounded-lg bg-muted" />
          <div className="h-72 animate-pulse rounded-xl bg-muted" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <Card className="border-destructive/30 bg-destructive/5 text-destructive">
          <CardHeader>
            <CardTitle>Failed to load transactions</CardTitle>
            <CardDescription>
              Please check that the backend API is running and your login session is still valid.
            </CardDescription>
          </CardHeader>
        </Card>
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
          category === "all" ||
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
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Transactions
            </h1>

            <p className="mt-2 text-muted-foreground">
              Add, edit, search, and filter records from your API.
            </p>
          </div>

          <Card size="sm" className="w-fit min-w-32">
            <CardContent>
              <p className="text-sm text-muted-foreground">Showing</p>
              <p className="mt-1 text-2xl font-semibold">{filteredTransactions.length}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Add transaction</CardTitle>
            <CardDescription>Create a new income or expense record.</CardDescription>
          </CardHeader>

          <CardContent>
            <CreateTransaction />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="grid gap-3 md:grid-cols-[1fr_220px]">
            <Input
              placeholder="Search by title..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {categories.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {filteredTransactions.length ===
        0 ? (
          <Card className="border-dashed bg-muted/20">
            <CardContent className="py-14 text-center">
              <h2 className="text-lg font-medium">
                No transactions found
              </h2>

              <p className="mt-2 text-muted-foreground">
                Create your first transaction or adjust your filters.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="min-w-64">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction._id}>
                      <TableCell className="font-medium">
                        {transaction.title}
                      </TableCell>
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell>
                        <span className={transaction.type === "income" ? "rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700" : "rounded-md bg-rose-50 px-2 py-1 text-xs font-medium text-rose-700"}>
                          {transaction.type}
                        </span>
                      </TableCell>
                      <TableCell>
                        {new Date(transaction.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className={transaction.type === "income" ? "text-right font-medium text-emerald-600" : "text-right font-medium text-rose-600"}>
                        {transaction.type === "income" ? "+" : "-"}{money(transaction.amount)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <EditTransaction transaction={transaction} />
                          <DeleteTransaction id={transaction._id} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
