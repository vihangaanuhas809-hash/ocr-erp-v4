"use client";

import { useRouter } from "next/navigation";

type Props = {
  id: number;
};

export default function DeleteButton({ id }: Props) {
  const router = useRouter();

  async function handleDelete() {
    const ok = confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!ok) return;

    const res = await fetch(`/api/employees/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete employee.");
      return;
    }

    alert("Employee deleted successfully.");

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