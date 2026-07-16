import AdvanceForm from "@/components/advance/AdvanceForm";

export default function NewAdvancePage() {
  return (
    <div className="mx-auto max-w-2xl p-8">
      <h1 className="mb-6 text-3xl font-bold text-white">
        Add Advance Payment
      </h1>

      <AdvanceForm />
    </div>
  );
}