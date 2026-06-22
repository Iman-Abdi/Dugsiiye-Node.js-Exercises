import Sidebar from "./Sidebar";

import Navbar from "./Navbar";

export default function DashboardLayout({
  children,
}) {
  return (
    <div className="min-h-screen bg-background lg:flex">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="min-w-0 flex-1">
        <Navbar />

        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
