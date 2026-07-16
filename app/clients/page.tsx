import Link from "next/link";
import ClientTable from "@/components/Client/ClientTable";

async function getClients() {
  const res = await fetch("http://localhost:3000/api/clients", {
    cache: "no-store",
  });

  if (!res.ok) return [];

  return await res.json();
}

export default async function ClientsPage() {
  const clients = await getClients();

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Clients</h1>

        <Link
          href="/clients/new"
          className="rounded-xl bg-amber-500 px-5 py-3 font-semibold text-black hover:bg-amber-400"
        >
          + Add Client
        </Link>
      </div>

      <ClientTable clients={clients} />
    </div>
  );
}