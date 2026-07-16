export default function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-8">
      <h2 className="text-xl font-semibold">
        OCR Construction ERP
      </h2>

      <div className="flex items-center gap-4">
        <button className="text-xl">🔔</button>

        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-amber-500"></div>

          <div>
            <p className="font-semibold">
              Admin
            </p>

            <p className="text-xs text-slate-400">
              OCR Construction
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}