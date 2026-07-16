import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(employees);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to load employees" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const employee = await prisma.employee.create({
      data: {
        name: body.name,
        phone: body.phone || null,
        position: body.position,
        salary: Number(body.salary),
      },
    });

    return NextResponse.json(employee, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to create employee" },
      { status: 500 }
    );
  }
}