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

export default function MaterialForm({ projects }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    quantity: "",
    unit: "",
    unitPrice: "",
    projectId: "",
  });

  const totalValue =
    Number(form.quantity || 0) *
    Number(form.unitPrice || 0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const res = await fetch("/api/materials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        quantity: Number(form.quantity),
        unitPrice: Number(form.unitPrice),
        projectId: Number(form.projectId),
      }),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Failed to save material");
      return;
    }

    router.push("/materials");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl bg-slate-900 p-8"
    >
      <h2 className="text-2xl font-bold">
        Add Material
      </h2>

      <input
        placeholder="Material Name"
        className="w-full rounded-lg bg-slate-800 p-3"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
        required
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
        required
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
          required
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
          required
        />

        <input
          type="number"
          placeholder="Unit Price"
          className="rounded-lg bg-slate-800 p-3"
          value={form.unitPrice}
          onChange={(e) =>
            setForm({
              ...form,
              unitPrice: e.target.value,
            })
          }
          required
        />
      </div>

      <div className="rounded-lg border border-green-700 bg-green-950 p-4">
        <p className="text-sm text-slate-400">
          Total Value
        </p>

        <h2 className="mt-2 text-3xl font-bold text-green-400">
          Rs. {totalValue.toLocaleString()}
        </h2>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-amber-500 px-6 py-3 font-bold text-black"
      >
        {loading ? "Saving..." : "Save Material"}
      </button>
    </form>
  );
}