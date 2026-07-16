import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const employeeCount = await prisma.employee.count();

  const projectCount = await prisma.project.count();

  const expense = await prisma.expense.aggregate({
    _sum: {
      amount: true,
    },
  });

  const advance = await prisma.advance.aggregate({
    _sum: {
      amount: true,
    },
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-xl bg-slate-900 border border-slate-800 p-6">
          <p className="text-slate-400">Employees</p>
          <h2 className="mt-2 text-3xl font-bold text-amber-400">
            {employeeCount}
          </h2>
        </div>

        <div className="rounded-xl bg-slate-900 border border-slate-800 p-6">
          <p className="text-slate-400">Projects</p>
          <h2 className="mt-2 text-3xl font-bold text-green-400">
            {projectCount}
          </h2>
        </div>

        <div className="rounded-xl bg-slate-900 border border-slate-800 p-6">
          <p className="text-slate-400">Expenses</p>
          <h2 className="mt-2 text-3xl font-bold text-red-400">
            Rs. {expense._sum.amount || 0}
          </h2>
        </div>

        <div className="rounded-xl bg-slate-900 border border-slate-800 p-6">
          <p className="text-slate-400">Advance Payments</p>
          <h2 className="mt-2 text-3xl font-bold text-blue-400">
            Rs. {advance._sum.amount || 0}
          </h2>
        </div>

      </div>
    </div>
  );
}