import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const employeeId = Number(
    req.nextUrl.searchParams.get("employeeId")
  );

  const presentDays = await prisma.attendance.count({
    where: {
      employeeId,
      status: "PRESENT",
    },
  });

  return NextResponse.json({
    presentDays,
  });
}