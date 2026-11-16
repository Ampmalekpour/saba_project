"use client";

import { Form, Input, InputNumber, Modal, Select } from "antd";
import { useEffect } from "react";

import type { Machine, MachineInput } from "@/types/machine";

interface Props {
  open: boolean;
  machine?: Machine | null;
  onCancel: () => void;
  onSubmit: (payload: MachineInput) => void;
  submitting: boolean;
}

export function MachineFormModal({ open, machine, onCancel, onSubmit, submitting }: Props) {
  const [form] = Form.useForm<MachineInput>();

  useEffect(() => {
    if (open) {
      form.setFieldsValue(
        machine
          ? {
              name: machine.name,
              location: machine.location,
              status: machine.status,
              temperature: machine.temperature,
            }
          : { name: "", location: "", status: "online", temperature: 25 },
      );
    }
  }, [open, machine, form]);

  return (
    <Modal
      title={machine ? "Edit Machine" : "Add Machine"}
      open={open}
      onCancel={onCancel}
      onOk={() => form.validateFields().then(onSubmit)}
      confirmLoading={submitting}
      okText={machine ? "Save" : "Add"}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="location" label="Location" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
          <Select
            options={[
              { value: "online", label: "Online" },
              { value: "offline", label: "Offline" },
            ]}
          />
        </Form.Item>
        <Form.Item name="temperature" label="Temperature (°C)" rules={[{ required: true }]}>
          <InputNumber className="w-full" min={-50} max={200} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
