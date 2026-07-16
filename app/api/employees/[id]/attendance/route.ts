import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const attendance = await prisma.attendance.findMany({
    where: {
      employeeId: Number(id),
    },
  });

  const totalOT = attendance.reduce(
    (sum, item) => sum + item.otHours,
    0
  );

  return NextResponse.json({
    totalOT,
  });
}