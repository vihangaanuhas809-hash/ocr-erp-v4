import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(clients);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to load clients" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const client = await prisma.client.create({
      data: {
        name: body.name,
        phone: body.phone || null,
        email: body.email || null,
        address: body.address || null,
      },
    });

    return NextResponse.json(client, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to create client" },
      { status: 500 }
    );
  }
}