type Props = {
  data: {
    employees: number;
    projects: number;
    clients: number;
    totalExpenses: number;
    totalPayments: number;
    totalPayroll: number;
    materials: number;
    stockTransactions: number;
  };
};

export default function DashboardCards({ data }: Props) {
  const cards = [
    {
      title: "Employees",
      value: data.employees,
      color: "bg-blue-600",
      icon: "👷",
    },
    {
      title: "Projects",
      value: data.projects,
      color: "bg-green-600",
      icon: "🏗️",
    },
    {
      title: "Clients",
      value: data.clients,
      color: "bg-purple-600",
      icon: "👥",
    },
    {
      title: "Expenses",
      value: `Rs. ${data.totalExpenses.toLocaleString()}`,
      color: "bg-red-600",
      icon: "💰",
    },
    {
      title: "Payments",
      value: `Rs. ${data.totalPayments.toLocaleString()}`,
      color: "bg-emerald-600",
      icon: "💵",
    },
    {
      title: "Payroll",
      value: `Rs. ${data.totalPayroll.toLocaleString()}`,
      color: "bg-yellow-500",
      icon: "📋",
    },
    {
      title: "Materials",
      value: data.materials,
      color: "bg-cyan-600",
      icon: "📦",
    },
    {
      title: "Stock Transactions",
      value: data.stockTransactions,
      color: "bg-orange-600",
      icon: "📊",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`${card.color} rounded-xl p-6 text-white shadow-lg`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">
                {card.title}
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {card.value}
              </h2>
            </div>

            <div className="text-5xl">
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}