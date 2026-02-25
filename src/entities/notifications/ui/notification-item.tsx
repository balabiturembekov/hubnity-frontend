"use client";

import { format } from "date-fns";
import { SquareCheckBig } from "lucide-react";
import {
  type NotificationEntity,
  useMarkNotificationAsReadMutation,
} from "@/entities/notifications";
import { UserAvatar } from "@/entities/user";
import { Button } from "@/shared/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";

interface NotificationItemProps {
  notification: NotificationEntity;
}

export const NotificationItem = ({ notification }: NotificationItemProps) => {
  const { mutate: markAsRead } = useMarkNotificationAsReadMutation(
    notification.id,
  );

  return (
    <div className="flex items-start gap-3 group">
      <div className="relative">
        {!notification.readAt && (
          <div className="absolute top-1/2 -translate-y-1/2 -left-3 rounded-full size-2 bg-primary z-10" />
        )}
        <UserAvatar name={notification.metadata.userName} />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground text-pretty">
            {notification.message}
          </p>
          <span className="text-xs text-muted-foreground">
            {format(notification.createdAt, "dd MMM yyyy, HH:mm")}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button size="sm" variant="outline" className="w-22 text-sm">
            Decline
          </Button>
          <Button size="sm" className="w-22 text-sm">
            Accept
          </Button>
        </div>
      </div>

      {!notification.readAt && (
        <Tooltip>
          <Button
            variant="ghost"
            size="icon-sm"
            className="opacity-0 group-hover:opacity-100 transition-discrete"
            onClick={() => markAsRead()}
            asChild
          >
            <TooltipTrigger>
              <SquareCheckBig />
            </TooltipTrigger>
          </Button>
          <TooltipContent>Mark as read</TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};
