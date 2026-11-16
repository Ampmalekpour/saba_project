"use client";

import { Alert as AntAlert, Button, Table, Tag, message } from "antd";

import { Badge } from "@/components/ui/badge";
import { useAcknowledgeAlert, useAlerts } from "@/hooks/useAlerts";
import { useMachines } from "@/hooks/useMachines";
import { getErrorMessage } from "@/lib/errors";
import type { Alert } from "@/types/alert";

export function AlertsTable() {
  const [messageApi, contextHolder] = message.useMessage();
  const { data: alerts, isLoading, isError, error, refetch, isFetching } = useAlerts();
  const { data: machines } = useMachines();
  const acknowledge = useAcknowledgeAlert();

  const machineName = (machineId: number) =>
    machines?.find((m) => m.id === machineId)?.name ?? `#${machineId}`;

  const handleAcknowledge = (id: number) => {
    acknowledge.mutate(id, {
      onSuccess: () => messageApi.success("Alert acknowledged"),
      onError: (err) => messageApi.error(getErrorMessage(err, "Failed to acknowledge alert")),
    });
  };

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
          <Button
            size="small"
            loading={acknowledge.isPending}
            onClick={() => handleAcknowledge(record.id)}
          >
            Acknowledge
          </Button>
        ),
    },
  ];

  if (isError) {
    return (
      <>
        {contextHolder}
        <AntAlert
          type="error"
          message="Failed to load alerts"
          description={getErrorMessage(error, "Could not reach the API.")}
          action={
            <Button size="small" loading={isFetching} onClick={() => refetch()}>
              Retry
            </Button>
          }
          showIcon
        />
      </>
    );
  }

  return (
    <>
      {contextHolder}
      <Table
        rowKey="id"
        loading={isLoading}
        dataSource={alerts}
        columns={columns}
        pagination={{ pageSize: 10 }}
        locale={{ emptyText: "No alerts" }}
      />
    </>
  );
}
