import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();

  await prisma.employee.update({
    where: {
      id: Number(body.employeeId),
    },
    data: {
      projectId: null,
    },
  });

  return NextResponse.json({
    success: true,
  });
}