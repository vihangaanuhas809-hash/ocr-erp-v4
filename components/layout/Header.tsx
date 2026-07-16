"use client";

import { Bell, Search } from "lucide-react";

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  const now = new Date();

  const greeting =
    now.getHours() < 12
      ? "Good Morning"
      : now.getHours() < 17
      ? "Good Afternoon"
      : "Good Evening";

  const today = now.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 px-6 py-5 shadow-lg">

      {/* Left */}

      <div>
        <h1 className="text-3xl font-bold text-white">
          {title}
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          {greeting} • {today}
        </p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        {/* Search */}

        <div className="hidden lg:flex items-center gap-3 rounded-xl bg-slate-800 px-4 py-2">

          <Search size={18} className="text-slate-400" />

          <input
            type="text"
            placeholder="Search..."
            className="w-56 bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
          />

        </div>

        {/* Notification */}

        <button className="relative rounded-xl bg-slate-800 p-3 transition hover:bg-slate-700">

          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>

        </button>

        {/* User */}

        <div className="flex items-center gap-3 rounded-xl bg-slate-800 px-4 py-2">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 font-bold text-black">
            A
          </div>

          <div className="hidden md:block">
            <p className="font-semibold text-white">
              Admin
            </p>

            <p className="text-xs text-slate-400">
              OCR Construction
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}