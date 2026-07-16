"use client";

import { useEffect, useState } from "react";

type Summary = {
  present: number;
  absent: number;
  leave: number;
  otHours: number;
};

export default function AttendanceSummary() {
  const [summary, setSummary] = useState<Summary>({
    present: 0,
    absent: 0,
    leave: 0,
    otHours: 0,
  });

  useEffect(() => {
    async function loadSummary() {
      const res = await fetch("/api/attendance/summary");
      const data = await res.json();
      setSummary(data);
    }

    loadSummary();
  }, []);

  return (
    <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">

      <div className="rounded-xl border border-green-700 bg-green-900/20 p-5">
        <p className="text-sm text-green-300">Present Today</p>
        <h2 className="mt-2 text-3xl font-bold text-green-400">
          {summary.present}
        </h2>
      </div>

      <div className="rounded-xl border border-red-700 bg-red-900/20 p-5">
        <p className="text-sm text-red-300">Absent Today</p>
        <h2 className="mt-2 text-3xl font-bold text-red-400">
          {summary.absent}
        </h2>
      </div>

      <div className="rounded-xl border border-yellow-700 bg-yellow-900/20 p-5">
        <p className="text-sm text-yellow-300">Leave Today</p>
        <h2 className="mt-2 text-3xl font-bold text-yellow-400">
          {summary.leave}
        </h2>
      </div>

      <div className="rounded-xl border border-blue-700 bg-blue-900/20 p-5">
        <p className="text-sm text-blue-300">OT Hours</p>
        <h2 className="mt-2 text-3xl font-bold text-blue-400">
          {summary.otHours}
        </h2>
      </div>

    </div>
  );
}