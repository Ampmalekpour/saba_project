import { api } from "@/lib/api";
import type { Alert } from "@/types/alert";

export async function fetchAlerts() {
  const { data } = await api.get<Alert[]>("/alerts");
  return data;
}

export async function acknowledgeAlert(id: number) {
  const { data } = await api.post<Alert>(`/alerts/${id}/acknowledge`);
  return data;
}
