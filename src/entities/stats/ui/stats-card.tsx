import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";
import { Card, CardContent } from "@/shared/ui/card";

interface StatsCardProps {
  title: string;
  icon: LucideIcon;
  stat: string | number;
  description: string | ReactNode;
  color?: "blue" | "red" | "green" | "yellow";
  statsClassName?: string;
}

export const StatsCard = ({
  stat,
  icon: Icon,
  description,
  title,
  statsClassName,
  color = "blue",
}: StatsCardProps) => {
  return (
    <Card className="transition-shadow hover:shadow-md w-full">
      <CardContent className="flex items-start justify-between gap-4">
        <div className="h-full flex flex-col justify-between gap-1">
          <h3 className="text-muted-foreground font-medium uppercase text-sm">
            {title}
          </h3>
          <div className={cn("text-3xl font-normal", statsClassName)}>
            {stat}
          </div>
          <div className="text-xs text-muted-foreground">{description}</div>
        </div>
        <div
          className={cn(
            "bg-blue-100 size-20 min-w-20 rounded-full flex items-center justify-center text-primary",
            {
              "bg-red-100 text-red-500": color === "red",
              "bg-green-100 text-green-500": color === "green",
              "bg-yellow-100 text-yellow-500": color === "yellow",
            },
          )}
        >
          <Icon size={40} />
        </div>
      </CardContent>
    </Card>
  );
};
