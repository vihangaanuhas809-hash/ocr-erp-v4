"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Project = {
  id: number;
  name: string;
};

type Props = {
  projects: Project[];
};

export default function PaymentForm({ projects }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    projectId: "",
    amount: "",
    method: "Cash",
    paymentDate: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const res = await fetch("/api/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId: Number(form.projectId),
        amount: Number(form.amount),
        method: form.method,
        paymentDate: form.paymentDate,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Failed to save payment");
      return;
    }

    router.push("/payments");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl bg-slate-900 p-8"
    >
      <h2 className="text-2xl font-bold">
        Add Payment
      </h2>

      <select
        className="w-full rounded-lg bg-slate-800 p-3"
        value={form.projectId}
        onChange={(e) =>
          setForm({ ...form, projectId: e.target.value })
        }
        required
      >
        <option value="">Select Project</option>

        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Amount"
        className="w-full rounded-lg bg-slate-800 p-3"
        value={form.amount}
        onChange={(e) =>
          setForm({ ...form, amount: e.target.value })
        }
        required
      />

      <select
        className="w-full rounded-lg bg-slate-800 p-3"
        value={form.method}
        onChange={(e) =>
          setForm({ ...form, method: e.target.value })
        }
      >
        <option>Cash</option>
        <option>Bank Transfer</option>
        <option>Cheque</option>
      </select>

      <input
        type="date"
        className="w-full rounded-lg bg-slate-800 p-3"
        value={form.paymentDate}
        onChange={(e) =>
          setForm({ ...form, paymentDate: e.target.value })
        }
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-amber-500 px-6 py-3 font-bold text-black"
      >
        {loading ? "Saving..." : "Save Payment"}
      </button>
    </form>
  );
}