import Link from "next/link";
import { prisma } from "@/lib/prisma";
import StockTable from "@/components/stock/StockTable";

export default async function StockPage() {
  const transactions = await prisma.stockTransaction.findMany({
    include: {
      material: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">
          Stock Management
        </h1>

        <Link
          href="/stock/new"
          className="rounded-lg bg-amber-500 px-5 py-3 font-semibold text-black"
        >
          + New Transaction
        </Link>
      </div>

      <StockTable transactions={transactions} />
    </div>
  );
}