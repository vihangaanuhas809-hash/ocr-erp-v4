import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [
    employees,
    projects,
    clients,
    expenses,
    payments,
    payroll,
    materials,
    stock,
  ] = await Promise.all([
    prisma.employee.count(),
    prisma.project.count(),
    prisma.client.count(),
    prisma.expense.aggregate({
      _sum: { amount: true },
    }),
    prisma.payment.aggregate({
      _sum: { amount: true },
    }),
    prisma.payroll.aggregate({
  _sum: {
    totalSalary: true,
  },
}),
    prisma.material.count(),
    prisma.stockTransaction.count(),
  ]);

  return NextResponse.json({
    employees,
    projects,
    clients,
    totalExpenses: expenses._sum.amount ?? 0,
    totalPayments: payments._sum.amount ?? 0,
    totalPayroll: payroll._sum.totalSalary ?? 0,
    materials,
    stockTransactions: stock,
  });
}
