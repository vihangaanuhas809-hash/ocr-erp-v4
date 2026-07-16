import Link from "next/link";
import BoqTable from "@/components/boq/BoqTable";

async function getBoq() {
  const res = await fetch("http://localhost:3000/api/boq", {
    cache: "no-store",
  });

  if (!res.ok) return [];

  return res.json();
}

export default async function BoqPage() {
  const items = await getBoq();

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          BOQ Management
        </h1>

        <Link
          href="/boq/new"
          className="rounded-lg bg-amber-500 px-5 py-3 font-bold text-black"
        >
          + Add BOQ
        </Link>
      </div>

      <BoqTable items={items} />
    </div>
  );
}