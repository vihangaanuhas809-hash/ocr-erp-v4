"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    
  try {
  const res = await fetch("http://10.161.121.65:3000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  alert("Status: " + res.status);

  const data = await res.json();

  alert(JSON.stringify(data));
} catch (err) {
  alert("Fetch Error");
  console.error(err);
}
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-xl bg-slate-900 p-8 shadow-xl"
      >
        <h1 className="mb-6 text-center text-3xl font-bold text-amber-400">
          OCR ERP Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          required
          className="mb-4 w-full rounded-lg bg-slate-800 p-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="mb-6 w-full rounded-lg bg-slate-800 p-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-amber-500 py-3 font-bold text-black"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}