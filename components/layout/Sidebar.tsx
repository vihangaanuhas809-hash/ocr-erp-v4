"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  { name: "📊 Dashboard", href: "/dashboard" },

  { name: "👷 Employees", href: "/employees" },
  { name: "📅 Attendance", href: "/attendance" },
  { name: "✅ Mark Attendance", href: "/attendance/new" },
  { name: "💵 Advance Payments", href: "/advances" },
  { name: "💰 Payroll", href: "/payroll" },

  { name: "🏗 Projects", href: "/projects" },
  { name: "👥 Clients", href: "/clients" },

  { name: "📦 Materials", href: "/materials" },
  { name: "💸 Expenses", href: "/expenses" },

  { name: "📑 Reports", href: "/reports" },

  { name: "📷 QR Attendance", href: "/attendance/qr" },
  { name: "🪪 QR Cards", href: "/employees/qr" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 min-h-screen">
      <div className="p-6 text-2xl font-bold text-amber-400">
        OCR ERP
      </div>

      <nav className="flex flex-col gap-2 px-4">
        {menus.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-lg px-4 py-3 transition ${
              pathname.startsWith(item.href)
                ? "bg-amber-500 text-black"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}