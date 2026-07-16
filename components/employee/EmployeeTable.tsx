import Link from "next/link";
import DeleteButton from "@/components/employee/DeleteButton";

interface Employee {
  id: number;
  name: string;
  phone: string | null;
  position: string;
  salary: number;
}

interface EmployeeTableProps {
  employees?: Employee[];
}

export default function EmployeeTable({
  employees = [],
}: EmployeeTableProps) {

  if (!employees || employees.length === 0) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center">
        <p className="text-slate-400">No Employees Found</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800">
      <table className="w-full">
        <thead className="bg-slate-800">
          <tr>
            
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Phone</th>
            <th className="px-4 py-3 text-left">Position</th>
            <th className="px-4 py-3 text-right">Salary</th>
            <th className="px-4 py-3 text-center">
            
  Actions
</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr
              key={employee.id}
              className="border-t border-slate-800"
            >
              <td className="px-4 py-3">{employee.name}</td>

              <td className="px-4 py-3">
                {employee.phone ?? "-"}
              </td>

              <td className="px-4 py-3">
                {employee.position}
              </td>

              <td className="px-4 py-3 text-right">
                Rs. {employee.salary.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-center">
  <div className="flex justify-center gap-2">
    <Link
      href={`/employees/${employee.id}/edit`}
      className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-500"
    >
      Edit
    </Link>

    <DeleteButton id={employee.id} />
  </div>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}