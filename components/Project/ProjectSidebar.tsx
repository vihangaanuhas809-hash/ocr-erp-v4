import Link from "next/link";

type Props = {
  id: number;
};

export default function ProjectSidebar({ id }: Props) {
  const menu = [
    { name: "Overview", icon: "🏠", href: `/projects/${id}` },
    { name: "BOQ", icon: "📋", href: `/projects/${id}/boq` },
    { name: "Expenses", icon: "💰", href: `/projects/${id}/expenses` },
    { name: "Materials", icon: "📦", href: `/projects/${id}/materials` },
    { name: "Employees", icon: "👷", href: `/projects/${id}/employees` },
    { name: "Payments", icon: "💳", href: `/projects/${id}/payments` },
    { name: "Photos", icon: "📷", href: `/projects/${id}/photos` },
    { name: "Reports", icon: "📊", href: `/projects/${id}/reports` },
  ];

  return (
    <aside className="w-64 rounded-2xl bg-slate-900 p-5">
      <h2 className="mb-6 text-xl font-bold text-amber-400">
        Project Menu
      </h2>

      <nav className="space-y-2">
        {menu.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-slate-800"
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}