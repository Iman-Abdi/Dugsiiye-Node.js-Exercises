import {
  useState,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  Input,
} from "@/components/ui/input";

import {
  Button,
} from "@/components/ui/button";

import {
  toast,
} from "sonner";

import {
  useLogin,
} from "../features/auth/authQueries";

import useAuthStore from "../store/authStore";

export default function Login() {
  const navigate =
    useNavigate();

  const loginMutation =
    useLogin();

  const login =
    useAuthStore(
      (state) =>
        state.login
    );

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const submit =
    async (e) => {
      e.preventDefault();

      try {
        const data =
          await loginMutation.mutateAsync(
            {
              email,
              password,
            }
          );

        login(
          data,
          data.token
        );

        toast.success(
          "Login successful"
        );

        navigate("/");
      } catch {
        toast.error(
          "Invalid credentials"
        );
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={
          submit
        }
        className="w-full max-w-md space-y-4"
      >
        <h1 className="text-3xl font-bold">
          Login
        </h1>

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <Button className="w-full">
          Login
        </Button>

        <p>
          No account?{" "}
          <Link
            to="/register"
            className="underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}