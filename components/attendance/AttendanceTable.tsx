type Attendance = {
  id: number;
  date: string;
  status: string;
  otHours: number;
  employee: {
    name: string;
  };
};

type Props = {
  attendances: Attendance[];
};

export default function AttendanceTable({
  attendances,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800">
      <table className="w-full">
        <thead className="bg-slate-900">
          <tr>
            <th className="px-4 py-3 text-left">Employee</th>
            <th className="px-4 py-3 text-center">Date</th>
            <th className="px-4 py-3 text-center">Status</th>
            <th className="px-4 py-3 text-center">OT Hours</th>
          </tr>
        </thead>

        <tbody>
          {attendances.map((attendance) => (
            <tr
              key={attendance.id}
              className="border-t border-slate-800"
            >
              <td className="px-4 py-3">
                {attendance.employee.name}
              </td>

              <td className="px-4 py-3 text-center">
                {new Date(attendance.date).toLocaleDateString()}
              </td>

              <td className="px-4 py-3 text-center">
                {attendance.status}
              </td>

              <td className="px-4 py-3 text-center">
                {attendance.otHours}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}