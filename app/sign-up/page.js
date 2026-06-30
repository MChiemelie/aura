"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signUpWithEmail } from "@/services/auth";

export default function SignUpPage() {
  const [state, formAction, pending] = useActionState(signUpWithEmail, {
    error: "",
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <form action={formAction} className="flex flex-col gap-4 w-[40%]">
        <h1 className="text-4xl font-extrabold text-center">Create Account</h1>

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
        <input
          id="name"
          name="name"
          placeholder="John Doe"
          type="text"
          className="border rounded p-4"
        />
        <button
          type="submit"
          disabled={pending}
          className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          {pending ? "Creating account..." : "Sign up"}
        </button>
        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
