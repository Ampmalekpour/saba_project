"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/useSidebarStore";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/machines", label: "Machines" },
  { href: "/alerts", label: "Alerts" },
];

export function Sidebar() {
  const { collapsed, toggle } = useSidebarStore();
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-border bg-panel transition-all",
        collapsed ? "w-16" : "w-56",
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <span className="text-sm font-semibold text-slate-200">
            Factory Monitor
          </span>
        )}
        <button
          onClick={toggle}
          className="rounded-md border border-border px-2 py-1 text-xs text-slate-400 hover:text-slate-200"
        >
          {collapsed ? "»" : "«"}
        </button>
      </div>
      <nav className="flex flex-col gap-1 px-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded-md px-3 py-2 text-sm text-slate-400 hover:bg-surface hover:text-slate-100",
              pathname === link.href && "bg-surface text-slate-100",
            )}
          >
            {collapsed ? link.label[0] : link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
