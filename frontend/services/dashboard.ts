import { api } from "@/lib/api";
import type { DashboardSummary } from "@/types/dashboard";

export async function fetchDashboardSummary() {
  const { data } = await api.get<DashboardSummary>("/dashboard/summary");
  return data;
}
