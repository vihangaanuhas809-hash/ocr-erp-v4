"use client";

import { useEffect, useState } from "react";

type Employee = {
  id: number;
  name: string;
  salary: number;
};

export default function PayrollPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeeId, setEmployeeId] = useState("");
  const [month, setMonth] = useState("");
  const [basicSalary, setBasicSalary] = useState(0);
  const [overtime, setOvertime] = useState(0);
  const [advance, setAdvance] = useState(0);
  const [presentDays, setPresentDays] = useState(0);

  useEffect(() => {
    fetch("/api/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, []);

  useEffect(() => {
    const emp = employees.find((e) => e.id === Number(employeeId));
    if (emp) {
      setBasicSalary(emp.salary);
    }
  },
  
  [employeeId, employees]);
 useEffect(() => {
  if (!employeeId) return;

  async function loadOvertime() {
    const res = await fetch(
      `/api/payroll/overtime?employeeId=${employeeId}`
    );

    const data = await res.json();
    setOvertime(data.overtime);
  }

  loadOvertime();
}, [employeeId]);
useEffect(() => {
  if (!employeeId || !month) return;

  async function loadPresentDays() {
    const res = await fetch(
      `/api/payroll/present-days?employeeId=${employeeId}&month=${month}`
    );

    const data = await res.json();
    setPresentDays(data.presentDays);
  }

  loadPresentDays();
}, [employeeId, month]);
useEffect(() => {
  if (!employeeId) return;

  async function loadAdvance() {
    const res = await fetch(
      `/api/payroll/advance?employeeId=${employeeId}`
    );

    const data = await res.json();

    setAdvance(data.advance);
  }

  loadAdvance();
}, [employeeId]);
  const totalSalary =
  basicSalary * presentDays +
  overtime -
  advance;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/payroll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employeeId: Number(employeeId),
        month,
        basicSalary,
        overtime,
        advance,
        totalSalary,
      }),
    });

    if (res.ok) {
      alert("Payroll Saved Successfully");
    } else {
      alert("Failed to Save Payroll");
    }
  }

  return (
    <div className="mx-auto max-w-xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Payroll</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <select
  className="w-full rounded-lg border border-slate-700 bg-slate-900 text-white p-3"
  value={employeeId}
  onChange={(e) => setEmployeeId(e.target.value)}
  required
>
          <option value="" className="bg-slate-900 text-white">
  Select Employee
</option>

{employees.map((emp) => (
  <option
    key={emp.id}
    value={emp.id}
    className="bg-slate-900 text-white"
  >
    {emp.name}
  </option>
))}
        </select>

        <input
          type="month"
          className="w-full rounded border p-3"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          required
        />

        <div>
  <label className="mb-2 block font-semibold">
    Daily Wage (Rs.)
  </label>

  <input
    type="number"
    className="w-full rounded border p-3"
    value={basicSalary}
    readOnly
  />
</div>

        <input
  type="number"
  placeholder="Enter Overtime Amount"
  className="w-full rounded border p-3"
  value={overtime === 0 ? "" : overtime}
  onChange={(e) =>
    setOvertime(Number(e.target.value) || 0)
  }
/>
        <div>
  <label className="mb-2 block font-semibold">
    Present Days
  </label>

  <input
    type="number"
    className="w-full rounded border p-3"
    value={presentDays}
    readOnly
  />
</div>

      <div>
  <label className="mb-2 block font-semibold">
    Advance (Rs.)
  </label>

  <input
    type="number"
    className="w-full rounded border p-3"
    value={advance}
    readOnly
  />
</div>
<div>
  <label className="mb-2 block font-semibold">
    Estimated Salary
  </label>

  <input
    type="number"
    className="w-full rounded border p-3 font-bold"
    value={totalSalary}
    readOnly
  />
</div>
<div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
  <h2 className="mb-4 text-xl font-bold">
    Salary Breakdown
  </h2>

  <div className="flex justify-between py-2">
    <span>Daily Wage</span>
    <span>Rs. {basicSalary.toLocaleString()}</span>
  </div>

  <div className="flex justify-between py-2">
    <span>Present Days</span>
    <span>{presentDays}</span>
  </div>

  <div className="flex justify-between py-2">
    <span>Overtime</span>
    <span>Rs. {overtime.toLocaleString()}</span>
  </div>

  <div className="flex justify-between py-2">
    <span>Advance</span>
    <span>- Rs. {advance.toLocaleString()}</span>
  </div>

  <hr className="my-3 border-slate-700" />

  <div className="flex justify-between text-xl font-bold text-amber-400">
    <span>Estimated Salary</span>
    <span>Rs. {totalSalary.toLocaleString()}</span>
  </div>
</div>
       <div className="flex gap-4">
  <button
    type="button"
    onClick={async () => {
      if (!employeeId || !month) {
        alert("Select Employee and Month");
        return;
      }

      const res = await fetch("/api/payroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeId: Number(employeeId),
          month,
          basicSalary,
          overtime,
        }),
      });

      if (res.ok) {
        alert("Payroll Generated Successfully");
      } else {
        alert("Failed to Generate Payroll");
      }
    }}
    className="flex-1 rounded bg-green-600 py-3 font-bold text-white hover:bg-green-700"
  >
    ⚡ Generate Payroll
  </button>

  <button
    type="submit"
    className="flex-1 rounded bg-amber-500 py-3 font-bold text-black"
  >
    💾 Save Payroll
  </button>
</div>
      </form>
    </div>
  );
}