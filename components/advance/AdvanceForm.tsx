"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Employee = {
  id: number;
  name: string;
};

export default function AdvanceForm() {
  const router = useRouter();

  const [employees, setEmployees] = useState<Employee[]>([]);

  const [employeeId, setEmployeeId] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    fetch("/api/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/advances", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employeeId,
        amount,
        reason,
        date,
      }),
    });

    if (!res.ok) {
      alert("Failed to save advance");
      return;
    }

    alert("Advance Saved Successfully");

    router.push("/advances");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <select
        className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        required
      >
        <option value="">Select Employee</option>

        {employees.map((emp) => (
          <option key={emp.id} value={emp.id}>
            {emp.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Advance Amount"
        className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <input
        type="date"
        className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <textarea
        placeholder="Reason (Optional)"
        className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />

      <button
        type="submit"
        className="w-full rounded-lg bg-amber-500 py-3 font-bold text-black"
      >
        Save Advance
      </button>

    </form>
  );
}