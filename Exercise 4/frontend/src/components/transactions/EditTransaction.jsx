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
  useUpdateTransaction,
} from "../../features/transactions/transactionQueries";

export default function EditTransaction({
  transaction,
}) {
  const mutation =
    useUpdateTransaction();

  const [title, setTitle] =
    useState(
      transaction.title
    );

  const [amount, setAmount] =
    useState(
      transaction.amount
    );

  const submit =
    async () => {
      try {
        await mutation.mutateAsync(
          {
            id:
              transaction._id,

            data: {
              ...transaction,
              title,
              amount:
                Number(amount),
            },
          }
        );

        toast.success(
          "Updated"
        );
      } catch {
        toast.error(
          "Update Failed"
        );
      }
    };

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <Input
        value={title}
        onChange={(e) =>
          setTitle(
            e.target.value
          )
        }
      />

      <Input
        type="number"
        value={amount}
        onChange={(e) =>
          setAmount(
            e.target.value
          )
        }
      />

      <Button
        onClick={
          submit
        }
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Saving..." : "Save"}
      </Button>
    </div>
  );
}
