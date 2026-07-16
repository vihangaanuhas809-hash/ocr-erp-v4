import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdvancesPage() {
  const advances = await prisma.advance.findMany({
    include: {
      employee: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">
          Advance Payments
        </h1>

        <Link
          href="/advances/new"
          className="rounded-lg bg-amber-500 px-5 py-3 font-semibold text-black hover:bg-amber-400"
        >
          + Add Advance
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
        <table className="w-full">
          <thead className="bg-slate-800">
            <tr>
              <th className="p-4 text-left">Employee</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Reason</th>
              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {advances.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-8 text-center text-slate-400"
                >
                  No Advance Payments Found
                </td>
              </tr>
            ) : (
              advances.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-slate-800"
                >
                  <td className="p-4">
                    {item.employee.name}
                  </td>

                  <td className="p-4 text-amber-400 font-semibold">
                    Rs. {item.amount.toLocaleString()}
                  </td>

                  <td className="p-4">
                    {item.reason || "-"}
                  </td>

                  <td className="p-4">
                    {new Date(item.date).toLocaleDateString()}
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