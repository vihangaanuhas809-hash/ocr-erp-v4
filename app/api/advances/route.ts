import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const advances = await prisma.advance.findMany({
    include: {
      employee: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  return NextResponse.json(advances);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const advance = await prisma.advance.create({
    data: {
      employeeId: Number(body.employeeId),
      amount: Number(body.amount),
      reason: body.reason,
      date: new Date(body.date),
    },
  });

  return NextResponse.json(advance, { status: 201 });
}