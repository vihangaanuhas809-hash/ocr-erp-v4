import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const employeeId = Number(
    req.nextUrl.searchParams.get("employeeId")
  );

  if (!employeeId) {
    return NextResponse.json({
      advance: 0,
    });
  }

  const totalAdvance = await prisma.advance.aggregate({
    where: {
      employeeId,
    },
    _sum: {
      amount: true,
    },
  });

  return NextResponse.json({
    advance: totalAdvance._sum.amount ?? 0,
  });
}