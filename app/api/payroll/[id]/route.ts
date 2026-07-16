import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  req: NextRequest,
  { params }: Props
) {
  const { id } = await params;

  const payroll = await prisma.payroll.findUnique({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json(payroll);
}

export async function PUT(
  req: NextRequest,
  { params }: Props
) {
  const { id } = await params;
  const body = await req.json();

  const totalSalary =
    Number(body.basicSalary) +
    Number(body.overtime) -
    Number(body.advance);

  const payroll = await prisma.payroll.update({
    where: {
      id: Number(id),
    },
    data: {
      basicSalary: Number(body.basicSalary),
      overtime: Number(body.overtime),
      advance: Number(body.advance),
      totalSalary,
    },
  });

  return NextResponse.json(payroll);
}
export async function DELETE(
  req: NextRequest,
  { params }: Props
) {
  const { id } = await params;

  await prisma.payroll.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({
    message: "Payroll deleted successfully",
  });
}