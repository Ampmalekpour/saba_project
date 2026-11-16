import { AlertsTable } from "@/features/alerts/AlertsTable";

export default function AlertsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-lg font-semibold text-slate-100">Alerts</h1>
      <AlertsTable />
    </div>
  );
}
