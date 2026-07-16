"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Props = {
  project: {
    name: string;
    location: string;
    contractValue: number;
    status: string;
  };
};

export default function ProjectReportButton({
  project,
}: Props) {
  function downloadPDF() {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("OCR CONSTRUCTION", 14, 20);

    doc.setFontSize(14);
    doc.text("Project Report", 14, 32);

    autoTable(doc, {
      startY: 40,
      head: [["Field", "Value"]],
      body: [
        ["Project", project.name],
        ["Location", project.location],
        [
          "Contract Value",
          `Rs. ${project.contractValue.toLocaleString()}`,
        ],
        ["Status", project.status],
      ],
    });

    doc.save(`${project.name}.pdf`);
  }

return (
  <button
    onClick={downloadPDF}
    className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-500"
  >
    📄 Download Project Report
  </button>
);

}  