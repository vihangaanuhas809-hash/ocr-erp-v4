import Link from "next/link";

interface Boq {
  id: number;
  item: string;
  quantity: number;
  unit: string;
  rate: number;
  amount: number;
  project: {
    name: string;
  };
}

interface Props {
  items?: Boq[];
}

export default function BoqTable({
  items = [],
}: Props) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl bg-slate-900 p-8 text-center">
        No BOQ Items Found
      </div>
    );
  }
  const total = items.reduce(
  (sum, item) => sum + item.amount,
  0
);

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800">
      <table className="w-full">
        <thead className="bg-slate-800">
          <tr>
            <th className="p-3 text-left">Item</th>
            <th className="p-3 text-right">Qty</th>
            <th className="p-3 text-left">Unit</th>
            <th className="p-3 text-right">Rate</th>
            <th className="p-3 text-right">Amount</th>
            <th className="p-3 text-left">Project</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className="border-t border-slate-800"
            >
              <td className="p-3">{item.item}</td>

              <td className="p-3 text-right">
                {item.quantity}
              </td>

              <td className="p-3">{item.unit}</td>

              <td className="p-3 text-right">
                Rs. {item.rate.toLocaleString()}
              </td>

              <td className="p-3 text-right font-semibold">
                Rs. {item.amount.toLocaleString()}
              </td>

              <td className="p-3">
                {item.project.name}
              </td>

              <td className="p-3 text-center">
                <Link
                  href={`/boq/${item.id}/edit`}
                  className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-500"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6 rounded-xl border border-amber-500 bg-slate-900 p-6">
  <p className="text-slate-400">
    Total BOQ Value
  </p>

  <h2 className="mt-2 text-4xl font-bold text-amber-400">
    Rs. {total.toLocaleString()}
  </h2>
</div>
    </div>
  );
}