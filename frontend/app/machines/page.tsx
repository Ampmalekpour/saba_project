import { MachineTable } from "@/features/machines/MachineTable";

export default function MachinesPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-lg font-semibold text-slate-100">Machines</h1>
      <MachineTable />
    </div>
  );
}
