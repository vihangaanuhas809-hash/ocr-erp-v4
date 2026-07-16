import BoqForm from "@/components/boq/BoqForm";

async function getProjects() {
  const res = await fetch("http://localhost:3000/api/projects", {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export default async function NewBoqPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-3xl p-8">
      <BoqForm projects={projects} />
    </div>
  );
}