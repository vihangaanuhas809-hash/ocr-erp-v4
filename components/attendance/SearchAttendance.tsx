"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchAttendance() {
  const [search, setSearch] = useState("");

  return (
    <div className="relative mb-6">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        placeholder="Search employee..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-white outline-none focus:border-amber-400"
      />
    </div>
  );
}