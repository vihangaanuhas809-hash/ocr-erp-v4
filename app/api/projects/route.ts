import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const projects = await prisma.project.findMany({
    include: {
      client: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const project = await prisma.project.create({
    data: {
      name: body.name,
      location: body.location,
      contractValue: Number(body.contractValue),
      clientId: Number(body.clientId),

      startDate: body.startDate
        ? new Date(body.startDate)
        : null,

      endDate: body.endDate
        ? new Date(body.endDate)
        : null,
    },

    include: {
      client: true,
    },
  });

  return NextResponse.json(project, {
    status: 201,
  });
}