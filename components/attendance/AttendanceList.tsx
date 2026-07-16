"use client";

import { useEffect, useState } from "react";
import AttendanceFilter from "./AttendanceFilter";

type Attendance = {
  id: number;
  status: string;
  overtime: number;
  createdAt: string;
  employee: {
    name: string;
  };
  project: {
    name: string;
  } | null;
};

export default function AttendanceList() {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  async function loadAttendance(value = "") {
    const res = await fetch(
      `/api/attendance?search=${value}&filter=${filter}`
    );

    const data = await res.json();
    setAttendance(data);
  }

  async function deleteAttendance(id: number) {
    if (!confirm("Delete this attendance record?")) return;

    const res = await fetch("/api/attendance", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      loadAttendance(search);
    } else {
      alert("Delete failed");
    }
  }

  useEffect(() => {
    loadAttendance();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadAttendance(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, filter]);

  return (
    <>
      <AttendanceFilter
        value={filter}
        onChange={setFilter}
      />

      <input
        type="text"
        placeholder="Search Employee..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
      />

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
        <table className="w-full">
          <thead className="bg-slate-800">
            <tr>
              <th className="p-4 text-left">Employee</th>
              <th className="p-4 text-left">Project</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Overtime</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {attendance.map((item) => (
              <tr
                key={item.id}
                className="border-t border-slate-800"
              >
                <td className="p-4">
                  {item.employee.name}
                </td>

                <td className="p-4">
                  {item.status === "PRESENT" && (
                    <span className="rounded-full bg-green-600 px-3 py-1 text-sm text-white">
                      Present
                    </span>
                  )}

                  {item.status === "ABSENT" && (
                    <span className="rounded-full bg-red-600 px-3 py-1 text-sm text-white">
                      Absent
                    </span>
                  )}

                  {item.status === "LEAVE" && (
                    <span className="rounded-full bg-yellow-500 px-3 py-1 text-sm text-black">
                      Leave
                    </span>
                  )}
                </td>
                <td className="p-4">
                {item.project?.name ?? "-"}
                </td>


                <td className="p-4">
                  {item.overtime} h
                </td>

                <td className="p-4">
                  {new Date(
                    item.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="p-4">
                  <button
  onClick={() => {
    window.location.href = `/attendance/${item.id}/edit`;
  }}
  className="mr-2 rounded-lg bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
>
  Edit
</button>
                  <button
                    onClick={() =>
                      deleteAttendance(item.id)
                    }
                    className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}