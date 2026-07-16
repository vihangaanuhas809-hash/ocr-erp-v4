import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const payroll = await prisma.payroll.findMany({
    include: {
      employee: true,
    },
    orderBy: {
      month: "desc",
    },
  });

  return NextResponse.json(payroll);
}
export async function POST(req: NextRequest) {
  const body = await req.json();
  const employeeId = Number(body.employeeId);

const attendanceCount = await prisma.attendance.count({
  where: {
    employeeId,
    status: "PRESENT",
    date: {
      gte: new Date(`${body.month}-01`),
      lt: new Date(
        new Date(`${body.month}-01`).setMonth(
          new Date(`${body.month}-01`).getMonth() + 1
        )
      ),
    },
  },
});

const totalAdvance = await prisma.advance.aggregate({
  where: {
    employeeId,
  },
  _sum: {
    amount: true,
  },
});

const advanceAmount = totalAdvance._sum.amount ?? 0;

const dailyWage = Number(body.basicSalary);

const calculatedSalary = dailyWage * attendanceCount;

const finalSalary =
  calculatedSalary +
  Number(body.overtime) -
  advanceAmount;

  const payroll = await prisma.payroll.create({
    data: {
      employeeId: Number(body.employeeId),
      month: body.month,
      basicSalary: Number(body.basicSalary),
      overtime: Number(body.overtime),
      advance: advanceAmount,
      totalSalary: finalSalary,   
     },
    include: {
      employee: true,
    },
  });

  return NextResponse.json(payroll, {
    status: 201,
  });
}