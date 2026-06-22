import UserMenu from "./UserMenu";

export default function Navbar() {
  return (
    <header className="h-16 border-b px-6 flex items-center justify-between">
      <h1 className="font-semibold">
        Dashboard
      </h1>

      <UserMenu />
    </header>
  );
}