import type { Alert } from "./alert";
import type { MachineStatus } from "./machine";

export interface DashboardSummary {
  total_machines: number;
  online_machines: number;
  offline_machines: number;
  active_alerts: number;
  recent_alerts: Alert[];
  machines: { id: number; name: string; status: MachineStatus }[];
}
