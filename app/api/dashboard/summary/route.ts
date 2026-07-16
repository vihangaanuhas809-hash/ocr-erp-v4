import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [
    employees,
    clients,
    projects,
    expenses,
    payments,
    materials,
    boqs,
  ] = await Promise.all([
    prisma.employee.count(),
    prisma.client.count(),
    prisma.project.count(),

    prisma.expense.aggregate({
      _sum: { amount: true },
    }),

    prisma.payment.aggregate({
      _sum: { amount: true },
    }),

    prisma.material.aggregate({
      _sum: {
        quantity: true,
      },
    }),

    prisma.boq.aggregate({
      _sum: {
        amount: true,
      },
    }),
  ]);

  return NextResponse.json({
    employees,
    clients,
    projects,

    expenses:
      expenses._sum.amount ?? 0,

    income:
      payments._sum.amount ?? 0,

    boq:
      boqs._sum.amount ?? 0,

    materials:
      materials._sum.quantity ?? 0,
  });
}