import type { DashboardSummary } from "@/types/dashboard";

export function SummaryCards({ summary }: { summary: DashboardSummary }) {
  const cards = [
    { label: "Total Machines", value: summary.total_machines, color: "text-slate-200" },
    { label: "Online", value: summary.online_machines, color: "text-online" },
    { label: "Offline", value: summary.offline_machines, color: "text-offline" },
    { label: "Active Alerts", value: summary.active_alerts, color: "text-critical" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-lg border border-border bg-panel p-4"
        >
          <p className="text-xs uppercase tracking-wide text-slate-500">
            {card.label}
          </p>
          <p className={`mt-2 text-2xl font-semibold ${card.color}`}>
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}
