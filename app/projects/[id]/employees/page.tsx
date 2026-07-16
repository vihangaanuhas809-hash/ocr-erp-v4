import { prisma } from "@/lib/prisma";
import AssignEmployeeButton from "@/components/Project/AssignEmployeeButton";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectEmployeesPage({
  params,
}: Props) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: {
      id: Number(id),
    },
  });

  const employees = await prisma.employee.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!project) {
    return <div>Project Not Found</div>;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-8">

      <h1 className="text-3xl font-bold text-white">
        Assign Employees
      </h1>

      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <p className="text-slate-400">
          Project
        </p>

        <h2 className="mt-2 text-2xl font-bold">
          {project.name}
        </h2>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

        <h2 className="mb-4 text-xl font-bold">
          Employees
        </h2>

        {employees.map((emp) => (
          <div
            key={emp.id}
            className="mb-3 flex items-center justify-between rounded-lg bg-slate-800 p-4"
          >
            <span>{emp.name}</span>

           <AssignEmployeeButton
  employeeId={emp.id}
  projectId={project.id}
/>
          </div>
        ))}

      </div>

    </div>
  );
}