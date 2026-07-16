type Transaction = {
  id: number;
  type: string;
  quantity: number;
  note: string | null;
  createdAt: Date;

  material: {
    id: number;
    name: string;
  };
};

interface Props {
  transactions: Transaction[];
}

export default function StockTable({
  transactions,
}: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-700">
      <table className="min-w-full">
        <thead>
          <tr className="bg-slate-900">
            <th className="p-3 text-left">Material</th>
            <th className="p-3">Type</th>
            <th className="p-3">Qty</th>
            <th className="p-3">Date</th>
            <th className="p-3">Note</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((t) => (
            <tr
              key={t.id}
              className="border-t border-slate-700"
            >
              <td className="p-3">{t.material.name}</td>

              <td className="p-3 text-center">
                {t.type}
              </td>

              <td className="p-3 text-center">
                {t.quantity}
              </td>

              <td className="p-3 text-center">
                {new Date(t.createdAt).toLocaleDateString()}
              </td>

              <td className="p-3">
                {t.note ?? "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}