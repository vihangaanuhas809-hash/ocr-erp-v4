"use client";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Employee = {
  id?: number;
  name: string;
  phone: string | null;
  position: string;
  salary: number;
};

type Props = {
  employee?: Employee;
};

export default function EmployeeForm({ employee }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: employee?.name ?? "",
    phone: employee?.phone ?? "",
    position: employee?.position ?? "",
    salary: employee?.salary?.toString() ?? "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const isEdit = !!employee?.id;

    const res = await fetch(
      isEdit ? `/api/employees/${employee.id}` : "/api/employees",
      {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          salary: Number(form.salary),
        }),
      }
    );

    setLoading(false);

    if (!res.ok) {
      alert("Failed to save employee");
      return;
    }

    router.push("/employees");
    router.refresh();
  }

  return (
    <Card>
  <form
    onSubmit={handleSubmit}
    className="space-y-5"
  >
      <h2 className="text-2xl font-bold">
        {employee ? "Edit Employee" : "Add Employee"}
      </h2>

      <Input
  label="Employee Name"
  value={form.name}
  onChange={(e) => setForm({ ...form, name: e.target.value })}
  required
/>

      <Input
  label="Phone"
  value={form.phone}
  onChange={(e) => setForm({ ...form, phone: e.target.value })}
/>

     <Input
  label="Position"
  value={form.position}
  onChange={(e) => setForm({ ...form, position: e.target.value })}
  required
/>

    <Input
  label="Salary"
  type="number"
  value={form.salary}
  onChange={(e) => setForm({ ...form, salary: e.target.value })}
  required
/>

     <Button type="submit">
  {loading
    ? "Saving..."
    : employee
    ? "Update Employee"
    : "Save Employee"}
</Button>
    </form>
    </Card>
  );
}