import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const employeeId = Number(
    req.nextUrl.searchParams.get("employeeId")
  );

  const overtime = await prisma.attendance.aggregate({
    _sum: {
      overtime: true,
    },
    where: {
      employeeId,
      status: "PRESENT",
    },
  });

  return NextResponse.json({
    overtime: overtime._sum.overtime || 0,
  });
}