import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const employee = await prisma.employee.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!employee) {
    return NextResponse.json(
      { error: "Employee not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(employee);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const employee = await prisma.employee.update({
    where: {
      id: Number(id),
    },
    data: {
      name: body.name,
      phone: body.phone,
      position: body.position,
      salary: Number(body.salary),
    },
  });

  return NextResponse.json(employee);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const employeeId = Number(id);

  await prisma.attendance.deleteMany({
    where: { employeeId },
  });

  await prisma.payroll.deleteMany({
    where: { employeeId },
  });

  await prisma.employee.delete({
    where: {
      id: employeeId,
    },
  });

  return NextResponse.json({
    success: true,
  });
}