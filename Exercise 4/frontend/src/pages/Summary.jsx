import DashboardLayout from "../components/layout/DashboardLayout";

import {
  useSummary,
} from "../features/transactions/transactionQueries";

export default function Summary() {
  const {
    data,
    isLoading,
  } =
    useSummary();

  if (isLoading)
    return (
      <h1>
        Loading...
      </h1>
    );

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-4">
        Monthly Summary
      </h1>

      {data?.map(
        (item) => (
          <div
            key={
              item._id
            }
            className="border p-3 rounded mb-2"
          >
            <h3>
              {item._id}
            </h3>

            <p>
              Total:
              {
                item.total
              }
            </p>
          </div>
        )
      )}
    </DashboardLayout>
  );
}