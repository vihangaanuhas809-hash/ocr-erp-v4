import AttendanceList from "@/components/attendance/AttendanceList";
import AttendanceSummary from "@/components/attendance/AttendanceSummary";

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">
        
        Attendance
      </h1>
      <AttendanceSummary />

      <AttendanceList />
    </div>
  );
}