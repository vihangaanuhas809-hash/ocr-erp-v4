import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const projectId = searchParams.get("projectId");

  const payments = await prisma.payment.findMany({
    where: projectId
      ? {
          projectId: Number(projectId),
        }
      : {},
    include: {
      project: true,
    },
    orderBy: {
      paymentDate: "desc",
    },
  });

  return NextResponse.json(payments);
}