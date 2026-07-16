import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const employeeId = Number(body.employeeId);

    const attendance = await prisma.attendance.create({
      data: {
        employeeId,
        status: "PRESENT",
        overtime: 0,
      },
      include: {
        employee: true,
      },
    });

    return NextResponse.json({
      success: true,
      attendance,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save attendance",
      },
      { status: 500 }
    );
  }
}