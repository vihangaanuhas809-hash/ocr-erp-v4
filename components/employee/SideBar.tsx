"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <input
      type="text"
      placeholder="🔍 Search employees..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mb-6 w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
    />
  );
}