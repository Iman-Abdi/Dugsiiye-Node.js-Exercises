import {
  Trash2,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  toast,
} from "sonner";

import {
  useDeleteTransaction,
} from "../../features/transactions/transactionQueries";

export default function DeleteTransaction({
  id,
}) {
  const mutation =
    useDeleteTransaction();

  const handleDelete =
    async () => {
      if (!window.confirm("Delete this transaction?")) {
        return;
      }

      try {
        await mutation.mutateAsync(
          id
        );

        toast.success(
          "Transaction Deleted"
        );
      } catch {
        toast.error(
          "Delete Failed"
        );
      }
    };

  return (
    <Button
      variant="destructive"
      size="icon"
      disabled={mutation.isPending}
      onClick={
        handleDelete
      }
    >
      <Trash2 size={18} />
    </Button>
  );
}
