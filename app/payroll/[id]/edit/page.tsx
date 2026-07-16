"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditPayrollPage() {
  const { id } = useParams();
  const router = useRouter();

  const [basicSalary, setBasicSalary] = useState(0);
  const [overtime, setOvertime] = useState(0);
  const [advance, setAdvance] = useState(0);

  useEffect(() => {
    async function loadPayroll() {
      const res = await fetch(`/api/payroll/${id}`);
      const data = await res.json();

      setBasicSalary(data.basicSalary);
      setOvertime(data.overtime);
      setAdvance(data.advance);
    }

    loadPayroll();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch(`/api/payroll/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        basicSalary,
        overtime,
        advance,
      }),
    });

    if (res.ok) {
      alert("Payroll Updated Successfully");
      router.push("/payroll");
    } else {
      alert("Update Failed");
    }
  }

  return (
    <div className="mx-auto max-w-xl p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Edit Payroll
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label>Daily Wage</label>
          <input
            type="number"
            className="w-full rounded border p-3"
            value={basicSalary}
            onChange={(e) =>
              setBasicSalary(Number(e.target.value))
            }
          />
        </div>

        <div>
          <label>Overtime</label>
          <input
            type="number"
            className="w-full rounded border p-3"
            value={overtime}
            onChange={(e) =>
              setOvertime(Number(e.target.value))
            }
          />
        </div>

        <div>
          <label>Advance</label>
          <input
            type="number"
            className="w-full rounded border p-3"
            value={advance}
            onChange={(e) =>
              setAdvance(Number(e.target.value))
            }
          />
        </div>

        <button className="w-full rounded bg-amber-500 py-3 font-bold text-black">
          Update Payroll
        </button>

      </form>
    </div>
  );
}