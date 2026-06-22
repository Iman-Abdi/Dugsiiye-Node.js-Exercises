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
  useRegister,
} from "../features/auth/authQueries";

export default function Register() {
  const navigate =
    useNavigate();

  const registerMutation =
    useRegister();

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const submit =
    async (e) => {
      e.preventDefault();

      try {
        await registerMutation.mutateAsync(
          form
        );

        toast.success(
          "Account created"
        );

        navigate(
          "/login"
        );
      } catch {
        toast.error(
          "Registration failed"
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
          Register
        </h1>

        <Input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name:
                e.target
                  .value,
            })
          }
        />

        <Input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email:
                e.target
                  .value,
            })
          }
        />

        <Input
          type="password"
          placeholder="Password"
          value={
            form.password
          }
          onChange={(e) =>
            setForm({
              ...form,
              password:
                e.target
                  .value,
            })
          }
        />

        <Button className="w-full">
          Register
        </Button>

        <p>
          Already have an account?{" "}
          <Link
            to="/login"
            className="underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}