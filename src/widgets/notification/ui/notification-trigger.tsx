"use client";

import { Bell } from "lucide-react";
import { useGetUnreadNotificationsCount } from "@/entities/notifications";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { PopoverTrigger } from "@/shared/ui/popover";

export const NotificationTrigger = () => {
  const { data: notificationsCount } = useGetUnreadNotificationsCount();

  return (
    <PopoverTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className="relative p-2 hover:bg-accent"
      >
        <Bell className="h-5 w-5" />
        {!!notificationsCount?.count && (
          <Badge
            variant="destructive"
            className="absolute top-0 right-0 p-0 size-5 flex items-center justify-center text-[10px]"
          >
            {notificationsCount.count}
          </Badge>
        )}
      </Button>
    </PopoverTrigger>
  );
};
