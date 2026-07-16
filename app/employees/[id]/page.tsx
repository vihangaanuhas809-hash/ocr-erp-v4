import EmployeeForm from "@/components/employee/EmployeeForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

async function getEmployee(id: string) {
  const res = await fetch(
    `http://localhost:3000/api/employees/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Employee not found");
  }

  return res.json();
}

export default async function EditEmployeePage({
  params,
}: Props) {
  const { id } = await params;

  const employee = await getEmployee(id);

  return (
    <div className="mx-auto max-w-2xl p-8">
      <EmployeeForm employee={employee} />
    </div>
  );
}