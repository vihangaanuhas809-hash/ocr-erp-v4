"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Client = {
  id?: number;
  name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
};

type Props = {
  client?: Client;
};

export default function ClientForm({ client }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: client?.name ?? "",
    phone: client?.phone ?? "",
    email: client?.email ?? "",
    address: client?.address ?? "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const isEdit = !!client?.id;

    const res = await fetch(
      isEdit ? `/api/clients/${client.id}` : "/api/clients",
      {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    setLoading(false);

    if (!res.ok) {
      alert("Failed to save client");
      return;
    }

    router.push("/clients");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900 p-8"
    >
      <h2 className="text-2xl font-bold">
        {client ? "Edit Client" : "Add Client"}
      </h2>

      <input
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
        placeholder="Client Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <input
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <input
        type="email"
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <textarea
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
        placeholder="Address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-amber-500 px-6 py-3 font-bold text-black hover:bg-amber-400 disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : client
          ? "Update Client"
          : "Save Client"}
      </button>
    </form>
  );
}