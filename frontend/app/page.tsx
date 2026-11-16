"use client";

import { Alert, Button, Spin } from "antd";

import { MachineStatusOverview } from "@/features/dashboard/MachineStatusOverview";
import { RecentAlerts } from "@/features/dashboard/RecentAlerts";
import { SummaryCards } from "@/features/dashboard/SummaryCards";
import { useDashboard } from "@/hooks/useDashboard";
import { getErrorMessage } from "@/lib/errors";

export default function Home() {
  const { data, isLoading, isError, error, refetch, isFetching } = useDashboard();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spin />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <Alert
        type="error"
        message="Failed to load dashboard"
        description={getErrorMessage(error, "Could not reach the API.")}
        action={
          <Button size="small" loading={isFetching} onClick={() => refetch()}>
            Retry
          </Button>
        }
        showIcon
      />
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
