"use client";

import { Alert, Button, Input, Popconfirm, Select, Space, Table, message } from "antd";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { useMachineMutations, useMachines } from "@/hooks/useMachines";
import { getErrorMessage } from "@/lib/errors";
import type { Machine, MachineInput } from "@/types/machine";

import { MachineFormModal } from "./MachineFormModal";

export function MachineTable() {
  const [messageApi, contextHolder] = message.useMessage();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string | undefined>();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Machine | null>(null);

  const { data, isLoading, isError, error, refetch, isFetching } = useMachines({
    search: search || undefined,
    status,
  });
  const { create, update, remove } = useMachineMutations();

  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (machine: Machine) => {
    setEditing(machine);
    setModalOpen(true);
  };

  const handleSubmit = (payload: MachineInput) => {
    const onDone = () => {
      setModalOpen(false);
      messageApi.success(editing ? "Machine updated" : "Machine added");
    };
    const onError = (err: unknown) => {
      messageApi.error(getErrorMessage(err, "Failed to save machine"));
    };
    if (editing) {
      update.mutate({ id: editing.id, payload }, { onSuccess: onDone, onError });
    } else {
      create.mutate(payload, { onSuccess: onDone, onError });
    }
  };

  const handleDelete = (id: number) => {
    remove.mutate(id, {
      onSuccess: () => messageApi.success("Machine deleted"),
      onError: (err) => messageApi.error(getErrorMessage(err, "Failed to delete machine")),
    });
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Location", dataIndex: "location", key: "location" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (value: Machine["status"]) => <Badge variant={value}>{value}</Badge>,
    },
    {
      title: "Temperature",
      dataIndex: "temperature",
      key: "temperature",
      render: (value: number) => `${value}°C`,
    },
    {
      title: "Last Updated",
      dataIndex: "last_updated",
      key: "last_updated",
      render: (value: string) => new Date(value).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Machine) => (
        <Space>
          <Button size="small" onClick={() => openEdit(record)}>
            Edit
          </Button>
          <Popconfirm title="Delete this machine?" onConfirm={() => handleDelete(record.id)}>
            <Button size="small" danger loading={remove.isPending}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {contextHolder}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Space>
          <Input.Search
            placeholder="Search by name"
            allowClear
            onSearch={setSearch}
            className="w-56"
          />
          <Select
            placeholder="Filter by status"
            allowClear
            className="w-40"
            options={[
              { value: "online", label: "Online" },
              { value: "offline", label: "Offline" },
            ]}
            onChange={setStatus}
          />
        </Space>
        <Button type="primary" onClick={openAdd}>
          Add Machine
        </Button>
      </div>
      {isError ? (
        <Alert
          type="error"
          message="Failed to load machines"
          description={getErrorMessage(error, "Could not reach the API.")}
          action={
            <Button size="small" loading={isFetching} onClick={() => refetch()}>
              Retry
            </Button>
          }
          showIcon
        />
      ) : (
        <Table
          rowKey="id"
          loading={isLoading}
          dataSource={data}
          columns={columns}
          pagination={{ pageSize: 10 }}
          locale={{ emptyText: "No machines found" }}
        />
      )}
      <MachineFormModal
        open={modalOpen}
        machine={editing}
        onCancel={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        submitting={create.isPending || update.isPending}
      />
    </div>
  );
}
