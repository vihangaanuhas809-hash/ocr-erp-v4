import Link from "next/link";
import MaterialTable from "@/components/materials/MaterialTable";

async function getMaterials() {
  const res = await fetch("http://localhost:3000/api/materials", {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export default async function MaterialsPage() {
  const materials = await getMaterials();

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Materials
        </h1>

        <Link
          href="/materials/new"
          className="rounded-lg bg-amber-500 px-5 py-3 font-bold text-black"
        >
          + Add Material
        </Link>
      </div>

      <MaterialTable materials={materials} />
    </div>
  );
}