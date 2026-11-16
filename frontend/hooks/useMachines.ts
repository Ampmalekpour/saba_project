import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createMachine,
  deleteMachine,
  fetchMachines,
  updateMachine,
} from "@/services/machines";
import type { MachineInput } from "@/types/machine";

export function useMachines(params?: { search?: string; status?: string }) {
  return useQuery({
    queryKey: ["machines", params],
    queryFn: () => fetchMachines(params),
  });
}

export function useMachineMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["machines"] });
    queryClient.invalidateQueries({ queryKey: ["dashboard-summary"] });
    queryClient.invalidateQueries({ queryKey: ["alerts"] });
  };

  const create = useMutation({
    mutationFn: (payload: MachineInput) => createMachine(payload),
    onSuccess: invalidate,
  });

  const update = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: MachineInput }) =>
      updateMachine(id, payload),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: (id: number) => deleteMachine(id),
    onSuccess: invalidate,
  });

  return { create, update, remove };
}
