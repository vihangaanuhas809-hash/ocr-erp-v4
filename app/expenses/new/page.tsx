import ExpenseForm from "@/components/expenses/ExpenseForm";

async function getProjects() {
  const res = await fetch("http://localhost:3000/api/projects", {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export default async function NewExpensePage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-2xl p-8">
      <ExpenseForm projects={projects} />
    </div>
  );
}