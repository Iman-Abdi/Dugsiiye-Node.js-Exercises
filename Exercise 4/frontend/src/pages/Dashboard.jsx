import {
  useProfile,
} from "../features/auth/authQueries";

import DashboardLayout from "../components/layout/DashboardLayout";
import { useTransactions } from "../features/transactions/transactionQueries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowDownRight,
  ArrowUpRight,
  CircleDollarSign,
  ReceiptText,
} from "lucide-react";

const money =
  (value = 0) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

export default function Dashboard() {
  const {
    data,
    isLoading,
  } =
    useProfile();

  const {
    data: transactions = [],
    isLoading: transactionsLoading,
  } = useTransactions();

  if (isLoading)
    return (
      <DashboardLayout>
        <div className="h-48 animate-pulse rounded-xl bg-muted" />
      </DashboardLayout>
    );

  const income =
    transactions
      .filter((item) => item.type === "income")
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const expenses =
    transactions
      .filter((item) => item.type === "expense")
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const balance =
    income - expenses;

  const recentTransactions =
    transactions.slice(0, 5);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm text-muted-foreground">
              Welcome back
            </p>

            <h1 className="mt-1 text-3xl font-semibold tracking-tight">
              Hi {data?.name || "there"}
            </h1>

            <p className="mt-2 max-w-2xl text-muted-foreground">
              A simple overview of your balance, income, expenses, and recent API activity.
            </p>
          </div>

          <div className="rounded-lg border bg-card px-4 py-3 text-sm text-muted-foreground">
            Signed in as{" "}
            <span className="font-medium text-foreground">
              {data?.email}
            </span>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard icon={CircleDollarSign} label="Current balance" value={money(balance)} tone="slate" />
          <StatCard icon={ArrowUpRight} label="Income" value={money(income)} tone="green" />
          <StatCard icon={ArrowDownRight} label="Expenses" value={money(expenses)} tone="red" />
          <StatCard icon={ReceiptText} label="Transactions" value={transactionsLoading ? "..." : transactions.length} tone="slate" />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
          <Card>
            <CardHeader>
              <CardTitle>Recent activity</CardTitle>
              <CardDescription>Latest transactions from the API.</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="divide-y">
                {recentTransactions.length ? (
                  recentTransactions.map((transaction) => (
                    <div key={transaction._id} className="flex items-center justify-between gap-4 py-4">
                      <div>
                        <p className="font-medium">{transaction.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {transaction.category} · {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>

                      <p className={transaction.type === "income" ? "font-medium text-emerald-600" : "font-medium text-rose-600"}>
                        {transaction.type === "income" ? "+" : "-"}{money(transaction.amount)}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-lg border border-dashed bg-muted/30 p-6 text-center text-muted-foreground">
                    No transactions yet. Add your first one to start tracking.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API status</CardTitle>
              <CardDescription>How the frontend is connected.</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
                Protected requests use the saved auth token. Transaction changes refresh both the transaction list and summary data.
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ icon: Icon, label, value, tone }) {
  const colors = {
    green: "bg-emerald-50 text-emerald-700",
    red: "bg-rose-50 text-rose-700",
    slate: "bg-muted text-foreground",
  };

  return (
    <Card>
      <CardContent>
        <div className={`mb-4 flex size-10 items-center justify-center rounded-lg ${colors[tone]}`}>
          <Icon className="size-5" />
        </div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
      </CardContent>
    </Card>
  );
}
