import {
  LayoutDashboard,
  Wallet,
  User,
  PieChart,
  ShieldCheck,
} from "lucide-react";

import {
  NavLink,
} from "react-router-dom";

import { useProfile } from "../../features/auth/authQueries";

export default function Sidebar() {
  const { data: user } =
    useProfile();

  const linkClass =
    ({ isActive }) =>
      [
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      ].join(" ");

  return (
    <aside className="flex min-h-screen w-72 flex-col border-r border-sidebar-border bg-sidebar p-4 text-sidebar-foreground">
      <div className="mb-6 border-b pb-5">
        <h1 className="text-xl font-semibold tracking-tight">
          Finance Tracker
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Simple money management.
        </p>
      </div>

      <nav className="space-y-2">
        <NavLink
          to="/"
          className={linkClass}
        >
          <LayoutDashboard className="size-4" />
          Dashboard
        </NavLink>

        <NavLink
          to="/transactions"
          className={linkClass}
        >
          <Wallet className="size-4" />
          Transactions
        </NavLink>

        <NavLink
          to="/summary"
          className={linkClass}
        >
          <PieChart className="size-4" />
          Summary
        </NavLink>

        <NavLink
          to="/profile"
          className={linkClass}
        >
          <User className="size-4" />
          Profile
        </NavLink>

        {user?.role === "admin" && (
          <NavLink
            to="/admin"
            className={linkClass}
          >
            <ShieldCheck className="size-4" />
            Admin
          </NavLink>
        )}
      </nav>

      <div className="mt-auto rounded-xl border bg-muted/40 p-4 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">
          API connected
        </p>
        <p className="mt-1">
          Data syncs through protected backend endpoints.
        </p>
      </div>
    </aside>
  );
}
