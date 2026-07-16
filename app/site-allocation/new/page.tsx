import { prisma } from "@/lib/prisma";
import SiteAllocationForm from "@/components/site-allocation/SiteAllocationForm";

export default async function NewSiteAllocationPage() {
  const employees = await prisma.employee.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const projects = await prisma.project.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="mx-auto max-w-2xl p-8">
      <h1 className="mb-6 text-3xl font-bold">
        New Site Allocation
      </h1>

      <SiteAllocationForm
        employees={employees}
        projects={projects}
      />
    </div>
  );
}