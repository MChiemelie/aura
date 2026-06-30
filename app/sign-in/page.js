"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signInWithEmail } from "@/services/auth";

export default function SignInPage() {
  const [state, formAction, pending] = useActionState(signInWithEmail, {
    error: "",
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <form action={formAction} className="flex flex-col gap-4 w-[40%]">
        <h1 className="text-4xl font-extrabold text-center">Login</h1>

        {state?.error && (
          <p
            className="text-red-500 text-sm bg-red-50 p-3 rounded"
            role="alert"
          >
            {state.error}
          </p>
        )}

        <input
          id="email"
          name="email"
          placeholder="example@email.com"
          type="email"
          className="border rounded p-4"
          required
        />
        <input
          id="password"
          name="password"
          placeholder="Password"
          minLength={8}
          type="password"
          className="border rounded p-4"
          required
        />
        <button
          type="submit"
          disabled={pending}
          className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          {pending ? "Signing in..." : "Sign In"}
        </button>
        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <Link href="/sign-up" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
