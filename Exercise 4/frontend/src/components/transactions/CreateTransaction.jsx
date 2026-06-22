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
      category: "",
      type:
        "expense",
    });

  const submit =
    async (e) => {
      e.preventDefault();

      try {
        await mutation.mutateAsync(
          {
            ...form,

            amount:
              Number(
                form.amount
              ),
          }
        );

        toast.success(
          "Transaction Created"
        );

        setForm({
          title: "",
          amount: "",
          category: "",
          type:
            "expense",
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
      className="space-y-3"
    >
      <Input
        placeholder="Title"
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

      <Input
        placeholder="Category"
        value={
          form.category
        }
        onChange={(e) =>
          setForm({
            ...form,
            category:
              e.target
                .value,
          })
        }
      />

      <Button>
        Create
      </Button>
    </form>
  );
}