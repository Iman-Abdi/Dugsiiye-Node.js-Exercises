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
    <div className="flex gap-2">
      <Input
        value={title}
        onChange={(e) =>
          setTitle(
            e.target.value
          )
        }
      />

      <Button
        onClick={
          submit
        }
      >
        Save
      </Button>
    </div>
  );
}