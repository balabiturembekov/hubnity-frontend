"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Checkbox } from "@/shared/ui/checkbox";
import { type Monitoring, monitorings } from "../consts/monitorings";

export const MonitoringSetups = () => {
  return (
    <section className="mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {monitorings.map((monitoringItem) => {
          return (
            <MonitoringSetup
              key={monitoringItem.id}
              monitoringItem={monitoringItem}
            />
          );
        })}
      </div>
    </section>
  );
};

const MonitoringSetup = ({
  monitoringItem,
}: {
  monitoringItem: Monitoring;
}) => {
  const { icon: Icon, ...monitoring } = monitoringItem;

  const [isChecked, setIsChecked] = useState(false);

  return (
    <label
      htmlFor={monitoring.id}
      key={monitoring.id}
      className="cursor-pointer"
    >
      <Card
        className={cn(
          "relative gap-4 h-full",
          isChecked && "bg-primary/3 border-primary/10",
        )}
      >
        {monitoring.isPopular && (
          <Badge className="bg-purple-200 border-purple-500 text-purple-800 absolute h-6 -top-3 right-6">
            <Star className="block size-4! fill-purple-500 text-transparent" />
            Popular
          </Badge>
        )}
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className="size-6 text-primary" />
            <h3 className="font-semibold">{monitoring.title}</h3>
          </div>
          <Checkbox
            id={monitoring.id}
            className="size-5 bg-primary/10 border-primary/10"
            onCheckedChange={(checked) => setIsChecked(checked as boolean)}
            checked={isChecked}
          />
        </CardHeader>
        <CardContent className="flex-1 text-muted-foreground text-sm">
          {monitoring.description}
        </CardContent>
      </Card>
    </label>
  );
};
