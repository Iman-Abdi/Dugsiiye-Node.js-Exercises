import {
  useState,
} from "react";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  toast,
} from "sonner";

import {
  useCreateTransaction,
} from "../../features/transactions/transactionQueries";

export default function CreateTransaction() {
  const mutation =
    useCreateTransaction();

  const [form, setForm] =
    useState({
      title: "",
      amount: "",
      category: "Food",
      type:
        "expense",
      date: new Date().toISOString().slice(0, 10),
    });

  const submit =
    async (e) => {
      e.preventDefault();

      try {
        await mutation.mutateAsync({
          ...form,
          amount: Number(form.amount),
        });

        toast.success(
          "Transaction Created"
        );

        setForm({
          title: "",
          amount: "",
          category: "Food",
          type:
            "expense",
          date: new Date().toISOString().slice(0, 10),
        });
      } catch {
        toast.error(
          "Failed"
        );
      }
    };

  return (
    <form
      onSubmit={
        submit
      }
      className="grid gap-3 md:grid-cols-2 xl:grid-cols-5"
    >
      <Input
        placeholder="Title"
        required
        value={
          form.title
        }
        onChange={(e) =>
          setForm({
            ...form,
            title:
              e.target
                .value,
          })
        }
      />

      <Input
        placeholder="Amount"
        type="number"
        min="0"
        step="0.01"
        required
        value={
          form.amount
        }
        onChange={(e) =>
          setForm({
            ...form,
            amount:
              e.target
                .value,
          })
        }
      />

      <Select
        value={
          form.category
        }
        onValueChange={(value) =>
          setForm({
            ...form,
            category: value,
          })
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Category" />
        </SelectTrigger>

        <SelectContent>
          {["Food", "Transport", "Bills", "Salary", "Shopping", "Health", "Other"].map((item) => (
            <SelectItem key={item} value={item}>{item}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={form.type}
        onValueChange={(value) =>
          setForm({
            ...form,
            type: value,
          })
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Type" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="expense">Expense</SelectItem>
          <SelectItem value="income">Income</SelectItem>
        </SelectContent>
      </Select>

      <Input
        type="date"
        value={form.date}
        onChange={(e) =>
          setForm({
            ...form,
            date: e.target.value,
          })
        }
      />

      <Button disabled={mutation.isPending} className="md:col-span-2 xl:col-span-5">
        {mutation.isPending ? "Creating..." : "Create transaction"}
      </Button>
    </form>
  );
}
