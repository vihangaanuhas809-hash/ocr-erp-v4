import Link from "next/link";
import EmployeeTable from "@/components/employee/EmployeeTable";

async function getEmployees() {
  const res = await fetch("http://localhost:3000/api/employees", {
    cache: "no-store",
  });

  if (!res.ok) return [];

  return res.json();
}

export default async function EmployeesPage() {
  const employees = await getEmployees();

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Employees</h1>

        <Link
          href="/employees/new"
          className="rounded-xl bg-amber-500 px-5 py-3 font-semibold text-black hover:bg-amber-400"
        >
          + Add Employee
        </Link>
      </div>

      <EmployeeTable employees={employees} />
    </div>
  );
}