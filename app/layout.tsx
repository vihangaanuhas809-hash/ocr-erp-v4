import type { Metadata } from "next";
import "./globals.css";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export const metadata: Metadata = {
  title: "OCR Construction ERP",
  description: "OCR Construction ERP System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-white">
        <div className="flex min-h-screen">
          <Sidebar />

          <div className="flex flex-1 flex-col">
            <Topbar />

            <main className="flex-1 p-6 bg-slate-950">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}