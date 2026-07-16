import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProjectReportButton from "@/components/reports/ProjectReportButton";
import Link from "next/link";
import ProjectProgress from "@/components/Project/ProjectProgress";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const today = new Date();
today.setHours(0, 0, 0, 0);

const project = await prisma.project.findUnique({
  where: {
    id: Number(id),
  },
  include: {
    client: true,
    expenses: true,
    payments: true,
    boqs: true,
    materials: true,

    siteAllocations: {
      where: {
        workDate: {
          gte: today,
        },
      },
      include: {
  employee: {
    select: {
      id: true,
      name: true,
      salary: true,
    },
  },
},
    },
  },
});

  if (!project) {
    notFound();
  }

  const totalExpenses = project.expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const totalPayments = project.payments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  const totalBoq = project.boqs.reduce(
    (sum, boq) => sum + boq.amount,
    0
  );

  const totalMaterials = project.materials.reduce(
    (sum, material) => sum + material.quantity * material.unitPrice,
    0
  );

  const outstanding = project.contractValue - totalPayments;

  const remainingBudget =
    project.contractValue - totalExpenses;

  const estimatedProfit =
    totalPayments - totalExpenses;

  const totalLabourCost = project.siteAllocations.reduce(
  (sum, allocation) => sum + allocation.employee.salary,
  0
);
    
  return (
    
    <div className="space-y-8">
     <ProjectProgress progress={project.progress} />
      <div>
        <h1 className="text-4xl font-bold">
          {project.name}
        </h1>

        <p className="mt-2 text-slate-400">
          {project.location}
        </p>
      <div className="mt-6 flex gap-3 overflow-x-auto">

  <Link
    href={`/projects/${project.id}`}
    className="rounded-lg bg-amber-500 px-5 py-2 font-semibold text-black"
  >
    Overview
  </Link>

  <Link
    href={`/boq?projectId=${project.id}`}
    className="rounded-lg bg-slate-800 px-5 py-2 hover:bg-slate-700"
  >
    BOQ
  </Link>

  <Link
    href={`/materials?projectId=${project.id}`}
    className="rounded-lg bg-slate-800 px-5 py-2 hover:bg-slate-700"
  >
    Materials
  </Link>

  <Link
    href={`/expenses?projectId=${project.id}`}
    className="rounded-lg bg-slate-800 px-5 py-2 hover:bg-slate-700"
  >
    Expenses
  </Link>

  <Link
    href={`/payments?projectId=${project.id}`}
    className="rounded-lg bg-slate-800 px-5 py-2 hover:bg-slate-700"
  >
    Payments
  </Link>

</div>
        <div 
        className="mt-4">
  <ProjectReportButton
    project={{
      name: project.name,
      location: project.location,
      contractValue: project.contractValue,
      status: project.status,
    }}
  />
</div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-xl bg-slate-900 p-6">
          <p className="text-slate-400">
            Contract Value
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-400">
            Rs. {project.contractValue.toLocaleString()}
          </h2>
        </div>

        <div className="rounded-xl bg-slate-900 p-6">
          <p className="text-slate-400">
            Payments Received
          </p>

          <h2 className="mt-2 text-3xl font-bold text-blue-400">
            Rs. {totalPayments.toLocaleString()}
          </h2>
        </div>

        <div className="rounded-xl bg-slate-900 p-6">
          <p className="text-slate-400">
            Outstanding
          </p>

          <h2 className="mt-2 text-3xl font-bold text-red-400">
            Rs. {outstanding.toLocaleString()}
          </h2>
        </div>

        <div className="rounded-xl bg-slate-900 p-6">
          <p className="text-slate-400">
            Total Expenses
          </p>

          <h2 className="mt-2 text-3xl font-bold text-orange-400">
            Rs. {totalExpenses.toLocaleString()}
          </h2>
        </div>

        <div className="rounded-xl bg-slate-900 p-6">
          <p className="text-slate-400">
            BOQ Value
          </p>

          <h2 className="mt-2 text-3xl font-bold text-purple-400">
            Rs. {totalBoq.toLocaleString()}
          </h2>
        </div>

        <div className="rounded-xl bg-slate-900 p-6">
          <p className="text-slate-400">
            Material Cost
          </p>

          <h2 className="mt-2 text-3xl font-bold text-cyan-400">
            Rs. {totalMaterials.toLocaleString()}
          </h2>
        </div>

        <div className="rounded-xl bg-slate-900 p-6">
          <p className="text-slate-400">
            Remaining Budget
          </p>

          <h2 className="mt-2 text-3xl font-bold text-yellow-400">
            Rs. {remainingBudget.toLocaleString()}
          </h2>
        </div>

        <div className="rounded-xl bg-slate-900 p-6">
          <p className="text-slate-400">
            Estimated Profit
          </p>

          <h2 className="mt-2 text-3xl font-bold text-emerald-400">
            Rs. {estimatedProfit.toLocaleString()}
          </h2>
        </div>

        <div className="rounded-xl bg-slate-900 p-6">
          <p className="text-slate-400">
            Status
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {project.status}
          </h2>
        </div>

      </div>
      <div className="rounded-xl bg-slate-900 p-6">
  <h2 className="mb-4 text-2xl font-bold">
    Recent Expenses
  </h2>
  

  {project.expenses.length === 0 ? (
    <p className="text-slate-400">
      No expenses found.
    </p>
  ) : (
    <table className="w-full">
      <thead>
        <tr className="border-b border-slate-700">
          <th className="py-2 text-left">Title</th>
          <th className="py-2 text-right">Amount</th>
        </tr>
      </thead>

      <tbody>
        {project.expenses.slice(0, 5).map((expense) => (
          <tr
            key={expense.id}
            className="border-b border-slate-800"
          >
            <td className="py-3">
              {expense.title}
            </td>

            <td className="py-3 text-right">
              Rs. {expense.amount.toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
)}
   </div>
   <div className="mt-8 rounded-xl bg-slate-900 p-6">
  <h2 className="mb-4 text-2xl font-bold">
    Recent Payments
  </h2>

  {project.payments.length === 0 ? (
    <p className="text-slate-400">
      No payments found.
    </p>
  ) : (
    <table className="w-full">
      <thead>
        <tr className="border-b border-slate-700">
          <th className="py-2 text-left">
            Method
          </th>

          <th className="py-2 text-right">
            Amount
          </th>

          <th className="py-2 text-right">
            Date
          </th>
        </tr>
      </thead>

      <tbody>
        {project.payments
          .slice(0, 5)
          .map((payment) => (
            <tr
              key={payment.id}
              className="border-b border-slate-800"
            >
              <td className="py-3">
                {payment.method ?? "-"}
              </td>

              <td className="py-3 text-right">
                Rs. {payment.amount.toLocaleString()}
              </td>

              <td className="py-3 text-right">
                {new Date(
                  payment.paymentDate
                ).toLocaleDateString()}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  )}
</div>
<div className="mt-8 rounded-xl bg-slate-900 p-6">
  <h2 className="mb-4 text-2xl font-bold">
    Recent Materials
  </h2>

  {project.materials.length === 0 ? (
    <p className="text-slate-400">
      No materials found.
    </p>
  ) : (
    <table className="w-full">
      <thead>
        <tr className="border-b border-slate-700">
          <th className="py-2 text-left">
            Material
          </th>

          <th className="py-2 text-right">
            Qty
          </th>

          <th className="py-2 text-right">
            Value
          </th>
        </tr>
      </thead>

      <tbody>
        {project.materials
          .slice(0, 5)
          .map((material) => (
            <tr
              key={material.id}
              className="border-b border-slate-800"
            >
              <td className="py-3">
                {material.name}
              </td>

              <td className="py-3 text-right">
                {material.quantity} {material.unit}
              </td>

              <td className="py-3 text-right">
                Rs. {(material.quantity * material.unitPrice).toLocaleString()}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  )}
</div>
<div className="mt-8 rounded-xl bg-slate-900 p-6">
  <h2 className="mb-4 text-2xl font-bold">
    Recent BOQ Items
  </h2>

  {project.boqs.length === 0 ? (
    <p className="text-slate-400">
      No BOQ items found.
    </p>
  ) : (
    <table className="w-full">
      <thead>
        <tr className="border-b border-slate-700">
          <th className="py-2 text-left">
            Item
          </th>

          <th className="py-2 text-right">
            Qty
          </th>

          <th className="py-2 text-right">
            Amount
          </th>
        </tr>
      </thead>

      <tbody>
        {project.boqs
          .slice(0, 5)
          .map((boq) => (
            <tr
              key={boq.id}
              className="border-b border-slate-800"
            >
              <td className="py-3">
                {boq.item}
              </td>

              <td className="py-3 text-right">
                {boq.quantity} {boq.unit}
              </td>

              <td className="py-3 text-right">
                Rs. {boq.amount.toLocaleString()}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  )}
</div>
<div className="mt-8 rounded-xl bg-slate-900 p-6">
  <div className="flex items-center justify-between">
    <h2 className="text-2xl font-bold">
      Today's Workers
    </h2>

    <Link
      href={`/site-allocation?projectId=${project.id}`}
      className="rounded-lg bg-amber-500 px-4 py-2 font-semibold text-black"
    >
      Allocate Workers
    </Link>
  </div>

  {project.siteAllocations.length === 0 ? (
    <p className="mt-4 text-slate-400">
      No workers allocated today.
    </p>
  ) : (
    <div className="mt-4 space-y-2">
      {project.siteAllocations.map((allocation) => (
        <div
          key={allocation.id}
          className="rounded-lg bg-slate-800 p-3"
        >
          👷 {allocation.employee.name}
        </div>
      ))}
    </div>
  )}
</div>
<div className="mt-8 rounded-xl bg-slate-900 p-6">
  <h2 className="mb-4 text-2xl font-bold">
    Today's Labour Cost
  </h2>

  {project.siteAllocations.length === 0 ? (
    <p className="text-slate-400">
      No labour cost today.
    </p>
  ) : (
    <>
      <div className="space-y-2">
        {project.siteAllocations.map((allocation) => (
          <div
            key={allocation.id}
            className="flex justify-between rounded-lg bg-slate-800 p-3"
          >
            <span>👷 {allocation.employee.name}</span>

            <span>
              Rs. {allocation.employee.salary.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-slate-700 pt-4 text-xl font-bold text-amber-400">
        Total : Rs. {totalLabourCost.toLocaleString()}
      </div>
    </>
  )}
</div>
    </div>
  );
}