"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { setCredentials } from "@/store/slices/auth-slice";
import { useAppDispatch } from "@/store/hooks";
import { useLoginAdminMutation } from "@/store/services/api";

export default function AdminLoginPage() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const [login, { isLoading }] = useLoginAdminMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAF5] px-6">
      <div className="w-full max-w-lg rounded-3xl bg-white p-10 shadow-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7CB342]">
          Admin Login
        </p>
        <h1 className="mt-4 text-4xl font-bold text-[#2D5016]">
          Sign in to the dashboard
        </h1>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          Use the seeded admin credentials from the backend environment to manage blogs, services, products, and submissions.
        </p>

        <form
          className="mt-8 space-y-5"
          onSubmit={form.handleSubmit(async (values) => {
            try {
              const response = await login(values).unwrap();
              localStorage.setItem("ifarmer_admin_token", response.token);
              localStorage.setItem("ifarmer_admin_user", JSON.stringify(response.user));
              dispatch(setCredentials(response));
              toast.success("Welcome back.");
              router.replace("/admin");
            } catch (error) {
              toast.error("Login failed.");
            }
          })}
        >
          <input
            placeholder="Email"
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
            {...form.register("email")}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
            {...form.register("password")}
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-[#2D5016] px-5 py-4 font-semibold text-white transition hover:bg-[#7CB342]"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
