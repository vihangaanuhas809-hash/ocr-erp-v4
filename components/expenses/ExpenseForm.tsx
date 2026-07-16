"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Project = {
  id: number;
  name: string;
};

type ExpenseFormProps = {
  projects: Project[];
};

export default function ExpenseForm({
  projects,
}: ExpenseFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "",
    amount: "",
    description: "",
    projectId: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const res = await fetch("/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: form.title,
        category: form.category,
        amount: Number(form.amount),
        description: form.description,
        projectId: form.projectId
          ? Number(form.projectId)
          : null,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Failed to save expense");
      return;
    }

    router.push("/expenses");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900 p-8"
    >
      <h2 className="text-2xl font-bold text-white">
        Add Expense
      </h2>

      <input
        type="text"
        placeholder="Expense Title"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
        required
      />

      <select
        value={form.projectId}
        onChange={(e) =>
          setForm({ ...form, projectId: e.target.value })
        }
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
      >
        <option value="">Select Project</option>

        {projects.map((project) => (
          <option
            key={project.id}
            value={project.id}
          >
            {project.name}
          </option>
        ))}
      </select>

      <select
        value={form.category}
        onChange={(e) =>
          setForm({ ...form, category: e.target.value })
        }
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
        required
      >
        <option value="">Select Category</option>
        <option value="Materials">Materials</option>
        <option value="Labour">Labour</option>
        <option value="Transport">Transport</option>
        <option value="Equipment">Equipment</option>
        <option value="Utilities">Utilities</option>
        <option value="Other">Other</option>
      </select>

      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) =>
          setForm({ ...form, amount: e.target.value })
        }
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
        required
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({
            ...form,
            description: e.target.value,
          })
        }
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
        rows={4}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-amber-500 px-6 py-3 font-bold text-black hover:bg-amber-400 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Expense"}
      </button>
    </form>
  );
}