"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditAttendancePage() {
  const params = useParams();
  const router = useRouter();

  const [status, setStatus] = useState("");
  const [overtime, setOvertime] = useState(0);

  useEffect(() => {
    async function loadAttendance() {
      const res = await fetch(
        `/api/attendance/${params.id}`
      );

      const data = await res.json();

      setStatus(data.status);
      setOvertime(data.overtime);
    }

    loadAttendance();
  }, [params.id]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const res = await fetch(
      `/api/attendance/${params.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          overtime,
        }),
      }
    );

    if (res.ok) {
      alert("Attendance Updated");
      router.push("/attendance");
    }
  }

  return (
    <div className="mx-auto max-w-xl p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Edit Attendance
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <select
          className="w-full rounded border p-3"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option value="PRESENT">Present</option>
          <option value="ABSENT">Absent</option>
          <option value="LEAVE">Leave</option>
        </select>

       <div>
  <label className="mb-2 block font-semibold">
    Overtime (Hours)
  </label>

  <input
    type="number"
    placeholder="Enter Overtime Hours"
    className="w-full rounded border p-3"
    value={overtime === 0 ? "" : overtime}
    onChange={(e) =>
      setOvertime(Number(e.target.value) || 0)
    }
  />
</div>

        <button className="w-full rounded bg-amber-500 py-3 font-bold text-black">
          Update Attendance
        </button>
      </form>
    </div>
  );
}