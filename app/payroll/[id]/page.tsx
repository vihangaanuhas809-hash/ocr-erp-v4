import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PayrollDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const payroll = await prisma.payroll.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      employee: true,
    },
  });

  if (!payroll) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">

      <div className="rounded-xl bg-slate-900 p-8">

        <h1 className="text-3xl font-bold text-amber-400">
          Employee Payslip
        </h1>

        <div className="mt-8 grid gap-4">

          <div className="flex justify-between">
            <span>Employee</span>
            <span>{payroll.employee.name}</span>
          </div>

          <div className="flex justify-between">
            <span>Month</span>
            <span>{payroll.month}</span>
          </div>

          <div className="flex justify-between">
            <span>Daily Wage</span>
            <span>Rs. {payroll.basicSalary.toLocaleString()}</span>
          </div>

          <div className="flex justify-between">
            <span>Overtime</span>
            <span>Rs. {payroll.overtime.toLocaleString()}</span>
          </div>

          <div className="flex justify-between">
            <span>Advance</span>
            <span>Rs. {payroll.advance.toLocaleString()}</span>
          </div>

          <hr className="border-slate-700" />

          <div className="flex justify-between text-2xl font-bold text-green-400">
            <span>Net Salary</span>
            <span>
              Rs. {payroll.totalSalary.toLocaleString()}
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}