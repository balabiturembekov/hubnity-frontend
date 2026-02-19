import type { PropsWithChildren } from "react";
import { cn } from "@/shared/lib/utils";

interface DashboardContainerProps extends PropsWithChildren {
  className?: string;
}

export const DashboardContainer = ({
  children,
  className,
}: DashboardContainerProps) => {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col overflow-hidden overflow-y-auto bg-linear-to-b from-primary/5 via-background to-background",
        className,
      )}
    >
      {children}
    </div>
  );
};
