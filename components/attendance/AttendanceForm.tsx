"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Employee = {
  id: number;
  name: string;
};

type Props = {
  employees: Employee[];
};

export default function AttendanceForm({
  employees,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    employeeId: "",
    status: "Present",
    otHours: "0",
    date: "",
  });

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    const res = await fetch("/api/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  employeeId: Number(form.employeeId),
  status: form.status.toUpperCase(),
  overtime: Number(form.otHours),
  date: form.date,
}),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Failed to save attendance");
      return;
    }

    router.push("/attendance");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl bg-slate-900 p-8"
    >
      <h2 className="text-2xl font-bold">
        Add Attendance
      </h2>

      <select
        className="w-full rounded-lg bg-slate-800 p-3"
        value={form.employeeId}
        onChange={(e) =>
          setForm({
            ...form,
            employeeId: e.target.value,
          })
        }
        required
      >
        <option value="">
          Select Employee
        </option>

        {employees.map((employee) => (
          <option
            key={employee.id}
            value={employee.id}
          >
            {employee.name}
          </option>
        ))}
      </select>

      <select
        className="w-full rounded-lg bg-slate-800 p-3"
        value={form.status}
        onChange={(e) =>
          setForm({
            ...form,
            status: e.target.value,
          })
        }
      >
        <option>Present</option>
        <option>Absent</option>
        <option>Half Day</option>
      </select>

      <input
        type="number"
        step="0.5"
        placeholder="OT Hours"
        className="w-full rounded-lg bg-slate-800 p-3"
        value={form.otHours}
        onChange={(e) =>
          setForm({
            ...form,
            otHours: e.target.value,
          })
        }
      />

      <input
        type="date"
        className="w-full rounded-lg bg-slate-800 p-3"
        value={form.date}
        onChange={(e) =>
          setForm({
            ...form,
            date: e.target.value,
          })
        }
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-amber-500 px-6 py-3 font-bold text-black"
      >
        {loading
          ? "Saving..."
          : "Save Attendance"}
      </button>
    </form>
  );
}