type Props = {
  progress: number;
};

export default function ProjectProgress({
  progress,
}: Props) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-bold">
          Project Progress
        </h2>

        <span className="text-2xl font-bold text-amber-400">
          {progress}%
        </span>
      </div>

      <div className="h-4 overflow-hidden rounded-full bg-slate-700">
        <div
          className="h-full rounded-full bg-amber-500 transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
}