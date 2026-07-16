"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Employee = {
  id: number;
  name: string;
};

type Project = {
  id: number;
  name: string;
};

type Props = {
  employees: Employee[];
  projects: Project[];
};

export default function SiteAllocationForm({
  employees,
  projects,
}: Props) {
  const router = useRouter();

  const [employeeId, setEmployeeId] = useState("");
  const [projectId, setProjectId] = useState("");
  const [workDate, setWorkDate] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/site-allocations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employeeId,
        projectId,
        workDate,
      }),
    });

    if (!res.ok) {
      alert("Failed to save allocation");
      return;
    }

    alert("Site Allocation Saved");

    router.push("/site-allocation");
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

        {employees.map((employee) => (
          <option key={employee.id} value={employee.id}>
            {employee.name}
          </option>
        ))}
      </select>

      <select
        className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
        required
      >
        <option value="">Select Project</option>

        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>

      <input
        type="date"
        className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
        value={workDate}
        onChange={(e) => setWorkDate(e.target.value)}
        required
      />

      <button
        type="submit"
        className="w-full rounded-lg bg-amber-500 py-3 font-bold text-black"
      >
        Save Allocation
      </button>

    </form>
  );
}