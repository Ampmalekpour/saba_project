export type MachineStatus = "online" | "offline";

export interface Machine {
  id: number;
  name: string;
  location: string;
  status: MachineStatus;
  temperature: number;
  last_updated: string;
}

export interface MachineInput {
  name: string;
  location: string;
  status: MachineStatus;
  temperature: number;
}
