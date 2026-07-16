import { prisma } from "@/lib/prisma";
import QRCode from "qrcode";

export default async function EmployeeQRPage() {
  const employees = await prisma.employee.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Employee QR Cards
      </h1>

      <div className="grid gap-6 md:grid-cols-3">

        {await Promise.all(
          employees.map(async (employee) => {

          const qr = await QRCode.toDataURL(`EMP-${employee.id}`);
            return (
              <div
                key={employee.id}
                className="rounded-xl border border-slate-700 bg-slate-900 p-6 text-center"
              >

                <img
                  src={qr}
                  alt="QR"
                  className="mx-auto w-40"
                />

                <h2 className="mt-4 text-xl font-bold">
                  {employee.name}
                </h2>

                <p className="text-slate-400">
                  {employee.position}
                </p>

              </div>
            );
          })
        )}

      </div>

    </div>
  );
}