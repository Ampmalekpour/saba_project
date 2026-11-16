import { Badge } from "@/components/ui/badge";
import type { DashboardSummary } from "@/types/dashboard";

export function MachineStatusOverview({
  machines,
}: {
  machines: DashboardSummary["machines"];
}) {
  return (
    <div className="rounded-lg border border-border bg-panel p-4">
      <h2 className="mb-3 text-sm font-semibold text-slate-200">
        Machine Status Overview
      </h2>
      <ul className="flex flex-col gap-2">
        {machines.map((machine) => (
          <li
            key={machine.id}
            className="flex items-center justify-between border-b border-border/60 py-1.5 text-sm last:border-none"
          >
            <span className="text-slate-300">{machine.name}</span>
            <Badge variant={machine.status}>{machine.status}</Badge>
          </li>
        ))}
      </ul>
    </div>
  );
}
