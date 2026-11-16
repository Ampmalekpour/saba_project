"use client";

import { Spin } from "antd";

import { MachineStatusOverview } from "@/features/dashboard/MachineStatusOverview";
import { RecentAlerts } from "@/features/dashboard/RecentAlerts";
import { SummaryCards } from "@/features/dashboard/SummaryCards";
import { useDashboard } from "@/hooks/useDashboard";

export default function Home() {
  const { data, isLoading } = useDashboard();

  if (isLoading || !data) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spin />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-lg font-semibold text-slate-100">Dashboard</h1>
      <SummaryCards summary={data} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <MachineStatusOverview machines={data.machines} />
        <RecentAlerts alerts={data.recent_alerts} />
      </div>
    </div>
  );
}
