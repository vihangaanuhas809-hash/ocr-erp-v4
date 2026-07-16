import ClientForm from "@/components/Client/ClientForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

async function getClient(id: string) {
  const res = await fetch(
    `http://localhost:3000/api/clients/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Client not found");
  }

  return res.json();
}

export default async function EditClientPage({
  params,
}: Props) {
  const { id } = await params;
  const client = await getClient(id);

  return (
    <div className="mx-auto max-w-2xl p-8">
      <ClientForm client={client} />
    </div>
  );
}