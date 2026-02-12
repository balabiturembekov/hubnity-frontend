import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface DashboardSectionHeaderProps extends React.ComponentProps<"div"> {
  title: string;
  icon: LucideIcon;
  actionChildren?: ReactNode;
}

export const DashboardSectionHeader = ({
  title,
  icon: Icon,
  className,
  children,
  actionChildren,
  ...props
}: DashboardSectionHeaderProps) => {
  return (
    <div
      className={cn("flex items-center justify-between", className)}
      {...props}
    >
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Projects</h2>
        {children}
      </div>

      <div className="flex items-center gap-2">{actionChildren}</div>
    </div>
  );
};
