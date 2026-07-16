import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get("search") || "";
  const filter = req.nextUrl.searchParams.get("filter") || "ALL";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let where: any = {
    employee: {
      name: {
        contains: search,
      },
    },
  };

  if (filter === "TODAY") {
    where.date = {
      gte: today,
    };
  }

 const attendance = await prisma.attendance.findMany({
  where,
  include: {
    employee: true,
    project: true,
  },
  orderBy: {
    createdAt: "desc",
  },
});

  return NextResponse.json(attendance);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Find today's site allocation
  const allocation = await prisma.siteAllocation.findFirst({
    where: {
      employeeId: Number(body.employeeId),
      workDate: {
        gte: today,
      },
    },
  });

  const attendance = await prisma.attendance.create({
    data: {
      employeeId: Number(body.employeeId),
      projectId: allocation?.projectId ?? null,
      status: String(body.status).toUpperCase(),
      overtime: Number(body.overtime),
      date: new Date(),
    },
    include: {
      employee: true,
      project: true,
    },
  });

  return NextResponse.json(attendance, {
    status: 201,
  });
  
}
export async function DELETE(req: NextRequest) {
  const body = await req.json();

  await prisma.attendance.delete({
    where: {
      id: Number(body.id),
    },
  });

  return NextResponse.json({
    message: "Attendance deleted successfully",
  });
}