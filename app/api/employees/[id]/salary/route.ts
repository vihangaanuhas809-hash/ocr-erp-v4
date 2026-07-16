import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const employee = await prisma.employee.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      name: true,
      salary: true,
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