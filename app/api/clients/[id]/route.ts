import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET
(
  request: NextRequest,
  { params }: Context
) {
  const { id } = await params;
  console.log("CLIENT ID ROUTE HIT");
  const client = await prisma.client.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!client) {
    return NextResponse.json(
      { message: "Client not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(client);
}

export async function PUT(
  request: NextRequest,
  { params }: Context
) {
  const { id } = await params;
  const body = await request.json();

  const client = await prisma.client.update({
    where: {
      id: Number(id),
    },
    data: {
      name: body.name,
      phone: body.phone,
      email: body.email,
      address: body.address,
    },
  });

  return NextResponse.json(client);
}

export async function DELETE(
  request: NextRequest,
  { params }: Context
) {
  const { id } = await params;

  await prisma.client.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({
    success: true,
  });
}