"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    alert("Admin account created successfully");

    router.push("/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md rounded-xl bg-slate-900 p-8"
      >
        <h1 className="mb-6 text-center text-3xl font-bold text-amber-400">
          Create Admin
        </h1>

        <input
          className="mb-4 w-full rounded-lg bg-slate-800 p-3"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="mb-4 w-full rounded-lg bg-slate-800 p-3"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="mb-6 w-full rounded-lg bg-slate-800 p-3"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full rounded-lg bg-amber-500 py-3 font-bold text-black">
          Create Admin
        </button>
        <div className="mt-6 text-center">
  <p className="text-slate-400">
    Already have an account?
  </p>

  <Link
  href="/login"
  className="mt-3 block w-full rounded-lg border border-amber-500 py-3 text-center font-bold text-amber-500 hover:bg-amber-500 hover:text-black"
>
  Login
</Link>
</div>
      </form>
    </div>
  );
}