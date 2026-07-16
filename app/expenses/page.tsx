import Link from "next/link";
import ExpenseTable from "@/components/expenses/ExpensesTable";

type Props = {
  searchParams: Promise<{
    projectId?: string;
  }>;
};

async function getExpenses(projectId?: string) {
  const url = projectId
    ? `http://localhost:3000/api/expenses?projectId=${projectId}`
    : "http://localhost:3000/api/expenses";

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  return res.json();
}

export default async function ExpensesPage({
  searchParams,
}: Props) {
  const { projectId } = await searchParams;

  const expenses = await getExpenses(projectId);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">
          Expenses
        </h1>

        <Link
          href="/expenses/new"
          className="rounded-lg bg-amber-500 px-5 py-3 font-semibold text-black"
        >
          + Add Expense
        </Link>
      </div>

      <ExpenseTable expenses={expenses} />
    </div>
  );
}