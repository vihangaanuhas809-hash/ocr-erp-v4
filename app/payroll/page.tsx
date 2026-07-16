"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Payroll = {
  id: number;
  month: string;
  basicSalary: number;
  overtime: number;
  advance: number;
  totalSalary: number;
  employee: {
    name: string;
  };
};

export default function PayrollPage() {
  const [payrolls, setPayrolls] = useState<Payroll[]>([]);

  async function loadPayroll() {
    const res = await fetch("/api/payroll");
    const data = await res.json();
    setPayrolls(data);
  }

  useEffect(() => {
    loadPayroll();
  }, []);

  async function deletePayroll(id: number) {
  if (!confirm("Delete this payroll record?")) return;

  const res = await fetch(`/api/payroll/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    loadPayroll();
  } else {
    alert("Delete Failed");
  }
}

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Payroll History
        </h1>

        <Link
          href="/payroll/new"
          className="rounded-lg bg-amber-500 px-5 py-3 font-bold text-black"
        >
          + Generate Payroll
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
        <table className="w-full">
          <thead className="bg-slate-800">
            <tr>
              <th className="p-4 text-left">Employee</th>
              <th className="p-4 text-left">Month</th>
              <th className="p-4 text-right">Salary</th>
              <th className="p-4 text-right">Advance</th>
              <th className="p-4 text-right">Overtime</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {payrolls.map((item) => (
              <tr
                key={item.id}
                className="border-t border-slate-800"
              >
                <td className="p-4">
                  {item.employee.name}
                </td>

                <td className="p-4">
                  {item.month}
                </td>

                <td className="p-4 text-right">
                  Rs. {item.totalSalary.toLocaleString()}
                </td>

                <td className="p-4 text-right">
                  Rs. {item.advance.toLocaleString()}
                </td>

                <td className="p-4 text-right">
                  Rs. {item.overtime.toLocaleString()}
                </td>
                <td className="p-4">
  <div className="flex justify-center gap-2">

    <Link
      href={`/payroll/${item.id}`}
      className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
    >
      View
    </Link>

    <Link
      href={`/payroll/${item.id}/edit`}
      className="rounded bg-amber-500 px-3 py-1 text-sm text-black hover:bg-amber-600"
    >
      Edit
    </Link>

    <button
  onClick={() => deletePayroll(item.id)}
  className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
>
  Delete
</button>
  </div>
</td>
              </tr>
              
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}