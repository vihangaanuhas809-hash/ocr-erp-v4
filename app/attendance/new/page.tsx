import { prisma } from "@/lib/prisma";
import AttendanceForm from "@/components/attendance/AttendanceForm";

export default async function NewAttendancePage() {
  const employees = await prisma.employee.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="mx-auto max-w-2xl p-8">
      <h1 className="mb-6 text-3xl font-bold text-white">
        Mark Attendance
      </h1>

      <AttendanceForm employees={employees} />
    </div>
  );
}