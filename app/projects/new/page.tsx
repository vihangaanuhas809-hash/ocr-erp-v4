import ProjectForm from "@/components/Project/ProjectForm";

async function getClients() {
  const res = await fetch("http://localhost:3000/api/clients", {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export default async function NewProjectPage() {
  const clients = await getClients();

  return (
    <div className="mx-auto max-w-2xl p-8">
      <ProjectForm clients={clients} />
    </div>
  );
}