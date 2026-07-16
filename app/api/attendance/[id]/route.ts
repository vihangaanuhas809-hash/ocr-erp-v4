import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  req: NextRequest,
  { params }: Props
) {
  const { id } = await params;

  const attendance = await prisma.attendance.findUnique({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json(attendance);
}

export async function PUT(
  req: NextRequest,
  { params }: Props
) {
  const { id } = await params;

  const body = await req.json();

  const attendance = await prisma.attendance.update({
    where: {
      id: Number(id),
    },
    data: {
      status: body.status,
      overtime: Number(body.overtime),
    },
  });

  return NextResponse.json(attendance);
}