"use client";

import { useRouter } from "next/navigation";

type Props = {
  employeeId: number;
  projectId: number;
};

export default function AssignEmployeeButton({
  employeeId,
  projectId,
}: Props) {
  const router = useRouter();

  async function assignEmployee() {
  const res = await fetch("/api/projects/assign", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      employeeId,
      projectId,
    }),
  });

  if (!res.ok) {
    alert("Failed to assign employee");
    return;
  }

  alert("Employee Assigned Successfully");

  router.push(`/projects/${projectId}`);
  router.refresh();

    router.refresh();
  }

  return (
    <button
      onClick={assignEmployee}
      className="rounded-lg bg-amber-500 px-4 py-2 font-semibold text-black hover:bg-amber-400"
    >
      Assign
    </button>
  );
}