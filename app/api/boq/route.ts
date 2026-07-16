import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.boq.findMany({
    include: {
      project: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const boq = await prisma.boq.create({
    data: {
      item: body.item,
      quantity: Number(body.quantity),
      unit: body.unit,
      rate: Number(body.rate),
      amount: Number(body.quantity) * Number(body.rate),
      projectId: Number(body.projectId),
    },
  });

  return NextResponse.json(boq, {
    status: 201,
  });
}