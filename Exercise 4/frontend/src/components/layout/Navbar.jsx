import UserMenu from "./UserMenu";
import MobileSidebar from "./MobileSidebar";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b bg-background px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="lg:hidden">
            <MobileSidebar />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Dashboard
            </p>

            <h1 className="text-lg font-semibold tracking-tight">
              Financial overview
            </h1>
          </div>
        </div>

        <UserMenu />
      </div>
    </header>
  );
}
