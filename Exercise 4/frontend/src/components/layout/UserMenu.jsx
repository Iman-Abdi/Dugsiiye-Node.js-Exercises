import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  useNavigate,
} from "react-router-dom";

import useAuthStore from "../../store/authStore";

export default function UserMenu() {
  const navigate =
    useNavigate();

  const logout =
    useAuthStore(
      (state) =>
        state.logout
    );

  const handleLogout =
    () => {
      logout();

      navigate(
        "/login"
      );
    };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback>
            U
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() =>
            navigate(
              "/profile"
            )
          }
        >
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={
            handleLogout
          }
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}