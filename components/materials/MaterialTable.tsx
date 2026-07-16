import Link from "next/link";

interface Material {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  project: {
    name: string;
  };
}

interface Props {
  materials?: Material[];
}

export default function MaterialTable({
  materials = [],
}: Props) {
  if (materials.length === 0) {
    return (
      <div className="rounded-xl bg-slate-900 p-8 text-center">
        No Materials Found
      </div>
    );
  }

  const totalValue = materials.reduce(
    (sum, material) =>
      sum + material.quantity * material.unitPrice,
    0
  );

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-slate-800">
        <table className="w-full">
          <thead className="bg-slate-800">
            <tr>
              <th className="p-3 text-left">Material</th>
              <th className="p-3 text-right">Qty</th>
              <th className="p-3 text-left">Unit</th>
              <th className="p-3 text-right">Unit Price</th>
              <th className="p-3 text-right">Value</th>
              <th className="p-3 text-left">Project</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {materials.map((material) => (
              <tr
                key={material.id}
                className="border-t border-slate-800"
              >
                <td className="p-3">{material.name}</td>

                <td className="p-3 text-right">
                  {material.quantity}
                </td>

                <td className="p-3">
                  {material.unit}
                </td>

                <td className="p-3 text-right">
                  Rs. {material.unitPrice.toLocaleString()}
                </td>

                <td className="p-3 text-right font-semibold">
                  Rs. {(material.quantity * material.unitPrice).toLocaleString()}
                </td>

                <td className="p-3">
                  {material.project.name}
                </td>

                <td className="p-3 text-center">
                  <Link
                    href={`/materials/${material.id}/edit`}
                    className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-500"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 rounded-xl border border-amber-500 bg-slate-900 p-6">
        <p className="text-slate-400">
          Total Material Value
        </p>

        <h2 className="mt-2 text-4xl font-bold text-amber-400">
          Rs. {totalValue.toLocaleString()}
        </h2>
      </div>
    </>
  );
}