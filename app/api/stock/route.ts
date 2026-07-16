import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const stock = await prisma.stockTransaction.findMany({
    include: {
      material: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(stock);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const transaction = await prisma.stockTransaction.create({
    data: {
      materialId: Number(body.materialId),
      type: body.type,
      quantity: Number(body.quantity),
      note: body.note,
    },
    include: {
      material: true,
    },
  });

  return NextResponse.json(transaction, {
    status: 201,
  });
}