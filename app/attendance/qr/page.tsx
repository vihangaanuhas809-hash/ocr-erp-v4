"use client";

import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function QRAttendancePage() {
  const router = useRouter();
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: {
          width: 250,
          height: 250,
        },
      },
      false
    );

   scanner.render(
  async (decodedText) => {

    scanner.clear();

    const employeeId = Number(
      decodedText.replace("EMP-", "")
    );

    const res = await fetch(
      "/api/attendance/scan",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeId,
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert(
        `${data.employee.name} Attendance Marked`
      );

      router.refresh();
    } else {
      alert(data.message);
    }

  },
  () => {}
);

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        QR Attendance
      </h1>

      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <div id="reader"></div>
      </div>
    </div>
  );
}