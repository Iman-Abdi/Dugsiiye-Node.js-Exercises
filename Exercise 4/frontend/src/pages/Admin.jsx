import DashboardLayout from "../components/layout/DashboardLayout";

import {
  useAdminOverview,
} from "../features/admin/adminQueries";

export default function Admin() {
  const {
    data,
    isLoading,
  } =
    useAdminOverview();

  if (isLoading) {
    return (
      <h1>
        Loading...
      </h1>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="border rounded p-4">
          <h2>
            Total Users
          </h2>

          <p className="text-2xl font-bold">
            {
              data?.totalUsers
            }
          </p>
        </div>

        <div className="border rounded p-4">
          <h2>
            Total Transactions
          </h2>

          <p className="text-2xl font-bold">
            {
              data?.totalTransactions
            }
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}