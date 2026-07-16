import Link from "next/link";
import PaymentTable from "@/components/payments/PaymentTable";

type Props = {
  searchParams: Promise<{
    projectId?: string;
  }>;
};

async function getPayments(projectId?: string) {
  const url = projectId
    ? `http://localhost:3000/api/payments?projectId=${projectId}`
    : "http://localhost:3000/api/payments";

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  return res.json();
}

export default async function PaymentsPage({
  searchParams,
}: Props) {
  const { projectId } = await searchParams;

  const payments = await getPayments(projectId);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">
          Payments
        </h1>

        <Link
          href="/payments/new"
          className="rounded-lg bg-amber-500 px-5 py-3 font-semibold text-black"
        >
          + Add Payment
        </Link>
      </div>

      <PaymentTable payments={payments} />
    </div>
  );
}