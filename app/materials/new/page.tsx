import MaterialForm from "@/components/materials/MaterialForm";

async function getProjects() {
  const res = await fetch("http://localhost:3000/api/projects", {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export default async function NewMaterialPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-3xl p-8">
      <MaterialForm projects={projects} />
    </div>
  );
}