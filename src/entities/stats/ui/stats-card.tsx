import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

interface StatsCardProps {
  title: string;
  icon: LucideIcon;
  stat: string | number;
  description: string;
}

export const StatsCard = ({
  stat,
  icon: Icon,
  description,
  title,
}: StatsCardProps) => {
  return (
    <Card className="transition-shadow hover:shadow-md w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{stat}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};
