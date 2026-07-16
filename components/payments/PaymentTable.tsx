import Link from "next/link";

interface Payment {
  id: number;
  amount: number;
  method: string | null;
  paymentDate: string;
  project: {
    name: string;
  };
}

interface Props {
  payments?: Payment[];
}

export default function PaymentTable({
  payments = [],
}: Props) {
  if (payments.length === 0) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center">
        <p className="text-slate-400">
          No Payments Found
        </p>
      </div>
    );
  }

  const total = payments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-slate-800">
        <table className="w-full">
          <thead className="bg-slate-800">
            <tr>
              <th className="px-4 py-3 text-left">
                Project
              </th>

              <th className="px-4 py-3 text-right">
                Amount
              </th>

              <th className="px-4 py-3 text-left">
                Method
              </th>

              <th className="px-4 py-3 text-center">
                Date
              </th>

              <th className="px-4 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="border-t border-slate-800"
              >
                <td className="px-4 py-3">
                  {payment.project.name}
                </td>

                <td className="px-4 py-3 text-right">
                  Rs. {payment.amount.toLocaleString()}
                </td>

                <td className="px-4 py-3">
                  {payment.method ?? "-"}
                </td>

                <td className="px-4 py-3 text-center">
                  {new Date(
                    payment.paymentDate
                  ).toLocaleDateString()}
                </td>

                <td className="px-4 py-3 text-center">
                  <Link
                    href={`/payments/${payment.id}/edit`}
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

      <div className="mt-6 rounded-xl border border-green-600 bg-slate-900 p-6">
        <p className="text-slate-400">
          Total Payments Received
        </p>

        <h2 className="mt-2 text-4xl font-bold text-green-400">
          Rs. {total.toLocaleString()}
        </h2>
      </div>
    </>
  );
}