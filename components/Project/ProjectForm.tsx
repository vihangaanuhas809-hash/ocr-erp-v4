"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Client = {
  id: number;
  name: string;
};

type Props = {
  clients: Client[];
};

export default function ProjectForm({ clients }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    clientId: "",
    location: "",
    contractValue: "",
    startDate: "",
    endDate: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        clientId: Number(form.clientId),
        contractValue: Number(form.contractValue),
      }),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Failed to save project");
      return;
    }

    router.push("/projects");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900 p-8"
    >
      <h2 className="text-2xl font-bold text-white">
        Add Project
      </h2>

      <input
        type="text"
        placeholder="Project Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
        required
      />

      <select
        value={form.clientId}
        onChange={(e) =>
          setForm({ ...form, clientId: e.target.value })
        }
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
        required
      >
        <option value="">Select Client</option>

        {clients.map((client) => (
          <option
            key={client.id}
            value={client.id}
          >
            {client.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Project Location"
        value={form.location}
        onChange={(e) =>
          setForm({ ...form, location: e.target.value })
        }
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
        required
      />

      <input
        type="number"
        placeholder="Contract Value"
        value={form.contractValue}
        onChange={(e) =>
          setForm({
            ...form,
            contractValue: e.target.value,
          })
        }
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
        required
      />

      <input
        type="date"
        value={form.startDate}
        onChange={(e) =>
          setForm({
            ...form,
            startDate: e.target.value,
          })
        }
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
      />

      <input
        type="date"
        value={form.endDate}
        onChange={(e) =>
          setForm({
            ...form,
            endDate: e.target.value,
          })
        }
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-amber-500 px-6 py-3 font-bold text-black hover:bg-amber-400 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Project"}
      </button>
    </form>
  );
}