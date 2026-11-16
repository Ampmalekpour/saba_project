"use client";

import { Button, Table, Tag } from "antd";

import { Badge } from "@/components/ui/badge";
import { useAcknowledgeAlert, useAlerts } from "@/hooks/useAlerts";
import { useMachines } from "@/hooks/useMachines";
import type { Alert } from "@/types/alert";

export function AlertsTable() {
  const { data: alerts, isLoading } = useAlerts();
  const { data: machines } = useMachines();
  const acknowledge = useAcknowledgeAlert();

  const machineName = (machineId: number) =>
    machines?.find((m) => m.id === machineId)?.name ?? `#${machineId}`;

  const columns = [
    {
      title: "Machine",
      dataIndex: "machine_id",
      key: "machine_id",
      render: (value: number) => machineName(value),
    },
    { title: "Message", dataIndex: "message", key: "message" },
    {
      title: "Severity",
      dataIndex: "severity",
      key: "severity",
      render: (value: Alert["severity"]) => <Badge variant={value}>{value}</Badge>,
    },
    {
      title: "Created",
      dataIndex: "created_at",
      key: "created_at",
      render: (value: string) => new Date(value).toLocaleString(),
    },
    {
      title: "Status",
      dataIndex: "acknowledged",
      key: "acknowledged",
      render: (value: boolean) =>
        value ? <Tag color="green">Acknowledged</Tag> : <Tag color="red">Active</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Alert) =>
        !record.acknowledged && (
          <Button size="small" onClick={() => acknowledge.mutate(record.id)}>
            Acknowledge
          </Button>
        ),
    },
  ];

  return (
    <Table
      rowKey="id"
      loading={isLoading}
      dataSource={alerts}
      columns={columns}
      pagination={{ pageSize: 10 }}
    />
  );
}
