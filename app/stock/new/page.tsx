import { prisma } from "@/lib/prisma";
import StockForm from "@/components/stock/StockForm";

export default async function NewStockPage() {
  const materials = await prisma.material.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="mx-auto max-w-2xl p-8">
      <StockForm materials={materials} />
    </div>
  );
}