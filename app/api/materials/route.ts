import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const materials = await prisma.Material.findMany({
    include: {
      project: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(materials);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const material = await prisma.Material.create({
    data: {
      name: body.name,
      unit: body.unit,
      quantity: Number(body.quantity),
      unitPrice: Number(body.unitPrice),
      projectId: Number(body.projectId),
    },
    include: {
      project: true,
    },
  });

  return NextResponse.json(material, {
    status: 201,
  });
}