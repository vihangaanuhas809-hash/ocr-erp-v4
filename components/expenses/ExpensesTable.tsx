import Link from "next/link";

interface Expense {
  id: number;
  title: string;
  category: string;
  amount: number;
  expenseDate: string;
  project: {
    name: string;
  } | null;
}

interface Props {
  expenses?: Expense[];
}

export default function ExpenseTable({
  expenses = [],
}: Props) {
  if (expenses.length === 0) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center">
        <p className="text-slate-400">No Expenses Found</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800">
      <table className="w-full">
        <thead className="bg-slate-800">
          <tr>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Project</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-right">Amount</th>
            <th className="px-4 py-3 text-center">Date</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id} className="border-t border-slate-800">
              <td className="px-4 py-3">{expense.title}</td>

              <td className="px-4 py-3">
                {expense.project?.name ?? "-"}
              </td>

              <td className="px-4 py-3">{expense.category}</td>

              <td className="px-4 py-3 text-right">
                Rs. {expense.amount.toLocaleString()}
              </td>

              <td className="px-4 py-3 text-center">
                {new Date(expense.expenseDate).toLocaleDateString()}
              </td>

              <td className="px-4 py-3 text-center">
                <Link
                  href={`/expenses/${expense.id}/edit`}
                  className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-500"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}