import {
  LayoutDashboard,
  Wallet,
  User,
} from "lucide-react";

import {
  NavLink,
} from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r min-h-screen p-4">
      <h1 className="font-bold text-2xl mb-6">
        Finance Tracker
      </h1>

      <nav className="space-y-2">
        <NavLink
          to="/"
          className="flex items-center gap-2 p-2 rounded"
        >
          <LayoutDashboard />
          Dashboard
        </NavLink>

        <NavLink
          to="/transactions"
          className="flex items-center gap-2 p-2 rounded"
        >
          <Wallet />
          Transactions
        </NavLink>

        <NavLink
          to="/profile"
          className="flex items-center gap-2 p-2 rounded"
        >
          <User />
          Profile
        </NavLink>
      </nav>
    </aside>
  );
}