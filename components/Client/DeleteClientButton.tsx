"use client";

import { useRouter } from "next/navigation";

type Props = {
  id: number;
};

export default function DeleteClientButton({ id }: Props) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Delete this client?")) return;

    const res = await fetch(`/api/clients/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete client");
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-500"
    >
      Delete
    </button>
  );
}