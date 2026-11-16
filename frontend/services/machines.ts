import { api } from "@/lib/api";
import type { Machine, MachineInput } from "@/types/machine";

export async function fetchMachines(params?: { search?: string; status?: string }) {
  const { data } = await api.get<Machine[]>("/machines", { params });
  return data;
}

export async function createMachine(payload: MachineInput) {
  const { data } = await api.post<Machine>("/machines", payload);
  return data;
}

export async function updateMachine(id: number, payload: MachineInput) {
  const { data } = await api.put<Machine>(`/machines/${id}`, payload);
  return data;
}

export async function deleteMachine(id: number) {
  await api.delete(`/machines/${id}`);
}
