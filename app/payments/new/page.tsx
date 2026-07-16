import PaymentForm from "@/components/payments/PaymentForm";

async function getProjects() {
  const res = await fetch("http://localhost:3000/api/projects", {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export default async function NewPaymentPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-2xl p-8">
      <PaymentForm projects={projects} />
    </div>
  );
}