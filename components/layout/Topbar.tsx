export default function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-6">
      <h1 className="text-xl font-bold text-white">
        OCR Construction ERP
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-slate-300">
          Welcome, Admin
        </span>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 font-bold text-black">
          A
        </div>
      </div>
    </header>
  );
}