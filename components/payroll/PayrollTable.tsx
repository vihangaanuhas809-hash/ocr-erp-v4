import PayrollReportButton from "./PayrollReportButton";

type Payroll = {
  id: number;
  month: string;
  total: number;

  employee: {
    name: string;
    salary?: number;
  };
};

type Props = {
  payrolls: Payroll[];
};

export default function PayrollTable({ payrolls }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800">
      <table className="w-full">
        <thead className="bg-slate-900">
          <tr>
            <th className="px-4 py-3 text-left">Employee</th>
            <th className="px-4 py-3 text-center">Month</th>
            <th className="px-4 py-3 text-right">Total Salary</th>
            <th className="px-4 py-3 text-center">Report</th>
          </tr>
        </thead>

        <tbody>
          {payrolls.map((payroll) => (
            <tr
              key={payroll.id}
              className="border-t border-slate-800"
            >
              <td className="px-4 py-3">
                {payroll.employee.name}
              </td>

              <td className="px-4 py-3 text-center">
                {payroll.month}
              </td>

              <td className="px-4 py-3 text-right">
                Rs. {payroll.total.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-center">
  <PayrollReportButton
    payroll={{
      employee: payroll.employee.name,
      month: payroll.month,
      basicSalary: payroll.employee.salary ?? payroll.total,
      otHours: 0,
      advance: 0,
      deductions: 0,
      netSalary: payroll.total,
    }}
  />
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}