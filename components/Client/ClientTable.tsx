import Link from "next/link";

interface Client {
  id: number;
  name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
}

interface ClientTableProps {
  clients?: Client[];
}

export default function ClientTable({
  clients = [],
}: ClientTableProps) {
  if (clients.length === 0) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center">
        <p className="text-slate-400">No Clients Found</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800">
      <table className="w-full">
        <thead className="bg-slate-800">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Phone</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Address</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {clients.map((client) => (
            <tr
              key={client.id}
              className="border-t border-slate-800"
            >
              <td className="px-4 py-3">{client.name}</td>

              <td className="px-4 py-3">
                {client.phone ?? "-"}
              </td>

              <td className="px-4 py-3">
                {client.email ?? "-"}
              </td>

              <td className="px-4 py-3">
                {client.address ?? "-"}
              </td>

              <td className="px-4 py-3 text-center">
                <Link
                  href={`/clients/${client.id}/edit`}
                  className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-500"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}