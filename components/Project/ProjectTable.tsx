import Link from "next/link";

interface Project {
  id: number;
  name: string;
  location: string;
  contractValue: number;
  progress: number;
  status: string;
  client: {
    name: string;
  };
}

interface Props {
  projects?: Project[];
}

export default function ProjectTable({
  projects = [],
}: Props) {
  if (projects.length === 0) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center">
        <p className="text-slate-400">No Projects Found</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800">
      <table className="w-full">
        <thead className="bg-slate-800">
          <tr>
            <th className="px-4 py-3 text-left">Project</th>
            <th className="px-4 py-3 text-left">Client</th>
            <th className="px-4 py-3 text-left">Location</th>
            <th className="px-4 py-3 text-right">Contract</th>
            <th className="px-4 py-3 text-center">Progress</th>
            <th className="px-4 py-3 text-center">Status</th>
            </tr>
          
        </thead>

        <tbody>
          {projects.map((project) => (
            <tr
              key={project.id}
              className="border-t border-slate-800"
            >
              <td className="px-4 py-3">
  <Link
    href={`/projects/${project.id}`}
    className="font-semibold text-amber-400 hover:underline"
  >
    {project.name}
  </Link>
  </td>
              <td className="px-4 py-3">{project.client.name}</td>
              <td className="px-4 py-3">{project.location}</td>
              <td className="px-4 py-3 text-right">
                Rs. {project.contractValue.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-center">
                {project.progress}%
              </td>
              <td className="px-4 py-3 text-center">
                {project.status}
              </td>
  
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}