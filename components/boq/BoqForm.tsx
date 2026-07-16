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

export default function BoqForm({ projects }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    item: "",
    quantity: "",
    unit: "",
    rate: "",
    projectId: "",
});

const amount =
  Number(form.quantity || 0) *
  Number(form.rate || 0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const res = await fetch("/api/boq", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item: form.item,
        quantity: Number(form.quantity),
        unit: form.unit,
        rate: Number(form.rate),
        amount: Number(form.quantity) * Number(form.rate),
        projectId: Number(form.projectId),
      }),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Failed to save BOQ Item");
      return;
    }

    router.push("/boq");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl bg-slate-900 p-8"
    >
      <h2 className="text-2xl font-bold">
        Add BOQ Item
      </h2>

      <input
        placeholder="Item Name"
        className="w-full rounded-lg bg-slate-800 p-3"
        value={form.item}
        onChange={(e) =>
          setForm({ ...form, item: e.target.value })
        }
      />

      <select
        className="w-full rounded-lg bg-slate-800 p-3"
        value={form.projectId}
        onChange={(e) =>
          setForm({
            ...form,
            projectId: e.target.value,
          })
        }
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

      <div className="grid grid-cols-3 gap-4">
        <input
          type="number"
          placeholder="Quantity"
          className="rounded-lg bg-slate-800 p-3"
          value={form.quantity}
          onChange={(e) =>
            setForm({
              ...form,
              quantity: e.target.value,
            })
          }
        />

        <input
          placeholder="Unit"
          className="rounded-lg bg-slate-800 p-3"
          value={form.unit}
          onChange={(e) =>
            setForm({
              ...form,
              unit: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Rate"
          className="rounded-lg bg-slate-800 p-3"
          value={form.rate}
          onChange={(e) =>
            setForm({
              ...form,
              rate: e.target.value,
            })
          }
        />
        <div className="rounded-xl border border-green-700 bg-green-950 p-5">
  <p className="text-sm text-slate-400">
    Total Amount
  </p>

  <h2 className="mt-2 text-3xl font-bold text-green-400">
    Rs. {amount.toLocaleString()}
  </h2>
</div>
      </div>

      <button
        className="rounded-lg bg-amber-500 px-6 py-3 font-bold text-black"
      >
        {loading ? "Saving..." : "Save BOQ"}
      </button>
    </form>
  );
}