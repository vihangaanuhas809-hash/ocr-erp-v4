type Props = {
  label?: string;
  type?: string;
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  readOnly?: boolean;
};

export default function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
  readOnly,
}: Props) {
  return (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-medium text-slate-300">
          {label}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        readOnly={readOnly}
        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-amber-500"
      />
    </div>
  );
}