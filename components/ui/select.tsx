type Option = {
  value: string;
  label: string;
};

type Props = {
  label?: string;
  value: string;
  options: Option[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function Select({
  label,
  value,
  options,
  onChange,
}: Props) {
  return (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-medium text-slate-300">
          {label}
        </label>
      )}

      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-amber-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}