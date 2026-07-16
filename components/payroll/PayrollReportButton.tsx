"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Props = {
  payroll: {
    employee: string;
    month: string;
    basicSalary: number;
    otHours: number;
    advance: number;
    deductions: number;
    netSalary: number;
  };
};

export default function PayrollReportButton({ payroll }: Props) {
  function downloadPDF() {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("OCR CONSTRUCTION", 14, 20);

    doc.setFontSize(14);
    doc.text("Salary Slip", 14, 30);

    autoTable(doc, {
      startY: 40,
      head: [["Field", "Value"]],
      body: [
        ["Employee", payroll.employee],
        ["Month", payroll.month],
        ["Basic Salary", `Rs. ${payroll.basicSalary.toLocaleString()}`],
        ["OT Hours", payroll.otHours.toString()],
        ["Advance", `Rs. ${payroll.advance.toLocaleString()}`],
        ["Deductions", `Rs. ${payroll.deductions.toLocaleString()}`],
        ["Net Salary", `Rs. ${payroll.netSalary.toLocaleString()}`],
      ],
    });

    doc.save(`${payroll.employee}-${payroll.month}.pdf`);
  }

  return (
    <button
      onClick={downloadPDF}
      className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-500"
    >
      📄 Download Salary Slip
    </button>
  );
}