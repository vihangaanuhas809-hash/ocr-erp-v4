"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Material = {
  id: number;
  name: string;
};

type Props = {
  materials: Material[];
};

export default function StockForm({ materials }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    materialId: "",
    type: "IN",
    quantity: "",
    note: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          materialId: Number(form.materialId),
          type: form.type,
          quantity: Number(form.quantity),
          note: form.note,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed");
      }

      router.push("/stock");
      router.refresh();
    } catch (error) {
      alert("Failed to save stock transaction.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl bg-slate-900 p-8"
    >
      <h1 className="text-2xl font-bold">
        New Stock Transaction
      </h1>

      <div>
        <label className="mb-2 block">
          Material
        </label>

        <select
          required
          value={form.materialId}
          onChange={(e) =>
            setForm({
              ...form,
              materialId: e.target.value,
            })
          }
          className="w-full rounded-lg bg-slate-800 p-3"
        >
          <option value="">
            Select Material
          </option>

          {materials.map((material) => (
            <option
              key={material.id}
              value={material.id}
            >
              {material.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block">
          Transaction Type
        </label>

        <select
          value={form.type}
          onChange={(e) =>
            setForm({
              ...form,
              type: e.target.value,
            })
          }
          className="w-full rounded-lg bg-slate-800 p-3"
        >
          <option value="IN">
            Stock In
          </option>

          <option value="OUT">
            Stock Out
          </option>
        </select>
      </div>

      <div>
        <label className="mb-2 block">
          Quantity
        </label>

        <input
          type="number"
          required
          value={form.quantity}
          onChange={(e) =>
            setForm({
              ...form,
              quantity: e.target.value,
            })
          }
          className="w-full rounded-lg bg-slate-800 p-3"
        />
      </div>

      <div>
        <label className="mb-2 block">
          Note
        </label>

        <textarea
          rows={4}
          value={form.note}
          onChange={(e) =>
            setForm({
              ...form,
              note: e.target.value,
            })
          }
          className="w-full rounded-lg bg-slate-800 p-3"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-amber-500 px-6 py-3 font-bold text-black"
      >
        {loading ? "Saving..." : "Save Transaction"}
      </button>
    </form>
  );
}