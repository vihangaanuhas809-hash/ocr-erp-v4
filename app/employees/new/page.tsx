import EmployeeForm from "@/components/employee/EmployeeForm";

export default function NewEmployeePage() {
  return (
    <div className="p-8">
      <h1 className="mb-4 text-3xl font-bold text-white">
        Employee Form Test
      </h1>

      <EmployeeForm />
    </div>
  );
}