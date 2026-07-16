import Link from "next/link";
import ProjectTable from "@/components/Project/ProjectTable";

async function getProjects() {
  const res = await fetch("http://localhost:3000/api/projects", {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">
          Projects
        </h1>

        <Link
          href="/projects/new"
          className="rounded-lg bg-amber-500 px-5 py-3 font-semibold text-black hover:bg-amber-400"
        >
          + Add Project
        </Link>
      </div>

      <ProjectTable projects={projects} />
    </div>
  );
}