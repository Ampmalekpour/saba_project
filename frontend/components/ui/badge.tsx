import * as React from "react";

import { cn } from "@/lib/utils";

const variantClasses = {
  default: "bg-slate-700 text-slate-200",
  online: "bg-online/15 text-online border border-online/30",
  offline: "bg-offline/15 text-offline border border-offline/30",
  low: "bg-slate-600/30 text-slate-300 border border-slate-500/30",
  medium: "bg-warning/15 text-warning border border-warning/30",
  high: "bg-critical/15 text-critical border border-critical/30",
} as const;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof variantClasses;
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium capitalize",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
