"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function AttendanceFilter({
  value,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mb-6 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
    >
      <option value="ALL">All Records</option>
      <option value="TODAY">Today</option>
      <option value="WEEK">This Week</option>
      <option value="MONTH">This Month</option>
    </select>
  );
}