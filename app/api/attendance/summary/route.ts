import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const attendance = await prisma.attendance.findMany({
    where: {
      date: {
        gte: today,
      },
    },
  });

  const present = attendance.filter(
    (a) => a.status === "PRESENT"
  ).length;

  const absent = attendance.filter(
    (a) => a.status === "ABSENT"
  ).length;

  const leave = attendance.filter(
    (a) => a.status === "LEAVE"
  ).length;

  const otHours = attendance.reduce(
    (sum, a) => sum + a.overtime,
    0
  );

  return NextResponse.json({
    present,
    absent,
    leave,
    otHours,
  });
}