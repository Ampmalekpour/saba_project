import { Badge } from "@/components/ui/badge";
import type { Alert } from "@/types/alert";

export function RecentAlerts({ alerts }: { alerts: Alert[] }) {
  return (
    <div className="rounded-lg border border-border bg-panel p-4">
      <h2 className="mb-3 text-sm font-semibold text-slate-200">Recent Alerts</h2>
      {alerts.length === 0 ? (
        <p className="text-sm text-slate-500">No alerts.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {alerts.map((alert) => (
            <li
              key={alert.id}
              className="flex items-center justify-between border-b border-border/60 py-1.5 text-sm last:border-none"
            >
              <span className="text-slate-300">{alert.message}</span>
              <Badge variant={alert.severity}>{alert.severity}</Badge>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
