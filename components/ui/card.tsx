type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}