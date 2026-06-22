import {
  useProfile,
} from "../features/auth/authQueries";

export default function Dashboard() {
  const {
    data,
    isLoading,
  } =
    useProfile();

  if (isLoading)
    return (
      <h1>
        Loading...
      </h1>
    );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        Welcome{" "}
        {data?.name}
      </h1>

      <p>
        {data?.email}
      </p>
    </div>
  );
}