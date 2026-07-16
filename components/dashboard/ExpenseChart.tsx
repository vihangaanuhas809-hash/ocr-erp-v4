"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", amount: 120000 },
  { month: "Feb", amount: 180000 },
  { month: "Mar", amount: 95000 },
  { month: "Apr", amount: 250000 },
  { month: "May", amount: 140000 },
  { month: "Jun", amount: 300000 },
];

export default function ExpenseChart() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-bold">
        Monthly Expenses
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="amount"
            fill="#f59e0b"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}