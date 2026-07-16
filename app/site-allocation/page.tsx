import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function SiteAllocationPage() {
  const allocations = await prisma.siteAllocation.findMany({
    include: {
      employee: true,
      project: true,
    },
    orderBy: {
      workDate: "desc",
    },
  });

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">
          Daily Site Allocation
        </h1>

        <Link
          href="/site-allocation/new"
          className="rounded-lg bg-amber-500 px-5 py-3 font-semibold text-black"
        >
          + New Allocation
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
        <table className="w-full">
          <thead className="bg-slate-800">
            <tr>
              <th className="p-4 text-left">Employee</th>
              <th className="p-4 text-left">Project</th>
              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {allocations.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="p-8 text-center text-slate-400"
                >
                  No Site Allocations Found
                </td>
              </tr>
            ) : (
              allocations.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-slate-800"
                >
                  <td className="p-4">
                    {item.employee.name}
                  </td>

                  <td className="p-4">
                    {item.project.name}
                  </td>

                  <td className="p-4">
                    {new Date(item.workDate).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}