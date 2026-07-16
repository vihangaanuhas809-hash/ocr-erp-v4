import EmployeeForm from "@/components/employee/EmployeeForm";

async function getEmployee(id: string) {
  const res = await fetch(`http://localhost:3000/api/employees/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Employee not found");
  }

  return res.json();
}

export default async function EditEmployeePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const employee = await getEmployee(id);

  return (
    <div className="p-8">
      <EmployeeForm employee={employee} />
    </div>
  );
}