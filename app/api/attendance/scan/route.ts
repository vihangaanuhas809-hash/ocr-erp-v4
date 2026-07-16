import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const employeeId = Number(body.employeeId);

    if (!employeeId) {
      return NextResponse.json(
        { message: "Invalid QR Code" },
        { status: 400 }
      );
    }

    const employee = await prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
    });

    if (!employee) {
      return NextResponse.json(
        { message: "Employee not found" },
        { status: 404 }
      );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // අද attendance එකක් තියෙනවද?
    const alreadyMarked = await prisma.attendance.findFirst({
      where: {
        employeeId,
        date: {
          gte: today,
        },
      },
    });

    if (alreadyMarked) {
      return NextResponse.json(
        { message: "Attendance already marked today." },
        { status: 400 }
      );
    }

    // අද Site Allocation එක හොයනවා
    const allocation = await prisma.siteAllocation.findFirst({
      where: {
        employeeId,
        workDate: {
          gte: today,
        },
      },
    });

    const attendance = await prisma.attendance.create({
      data: {
        employeeId,
        projectId: allocation?.projectId ?? null,
        status: "PRESENT",
        overtime: 0,
        date: new Date(),
      },
    });

    return NextResponse.json({
      message: "Attendance marked successfully",
      employee,
      attendance,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}