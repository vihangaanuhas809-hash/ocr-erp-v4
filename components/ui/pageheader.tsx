type Props = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export default function PageHeader({
  title,
  description,
  action,
}: Props) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-white">
          {title}
        </h1>

        {description && (
          <p className="mt-1 text-slate-400">
            {description}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}