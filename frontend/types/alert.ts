export type AlertSeverity = "low" | "medium" | "high";

export interface Alert {
  id: number;
  machine_id: number;
  message: string;
  severity: AlertSeverity;
  created_at: string;
  acknowledged: boolean;
}
